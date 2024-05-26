import AppointmentView from '../types/AppointmentView'
import { Errors } from '../types/AppointmentFormErrors'
import {
  useNavigate,
  useNavigation,
  useActionData,
  Form,
  useSubmit,
  json,
} from 'react-router-dom'
import { useEffect, useState, ChangeEvent } from 'react'
import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormSelect from 'react-bootstrap/FormSelect'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {
  fetchClientAppointmentsByDate,
  fetchStylistAppointmentsByDate,
  generateAvailableAppointmentTimes,
  getFormattedLocalTime,
  isAppointmentConflict,
} from '../utils/appointmentFunctions'
import { getUser } from '../utils/authFunctions'
import { fetchClients } from '../utils/clientFunctions'
import { fetchStylists } from '../utils/StylistFunctions'
import { ClientDTO } from '../types/Client'
import { StylistDTO } from '../types/Stylist'
import { getFormattedDate } from '../utils/appointmentFunctions'
import { SubmitTarget } from 'react-router-dom/dist/dom'

const AppointmentForm = ({
  method,
  appointment,
}: {
  method: 'POST' | 'PUT'
  appointment?: AppointmentView
}) => {
  const errors = useActionData() as Errors
  const navigation = useNavigation()
  const navigate = useNavigate()
  const user = getUser()
  const isSubmitting = navigation.state === 'submitting'
  const [appointmentId, setAppointmentId] = useState<number>()
  const [userId, setUserId] = useState<number>()
  const [stylists, setStylists] = useState<StylistDTO[] | undefined>([])
  const [client, setClient] = useState<ClientDTO | undefined>()
  const [clients, setClients] = useState<ClientDTO[] | undefined>([])
  const [stylist, setStylist] = useState<StylistDTO | undefined>()
  const [appointmentDate, setAppointmentDate] = useState<string>()
  const [startTimeOptions, setStartTimeOptions] = useState<string[]>()
  const [endTimeOptions, setEndTimeOptions] = useState<string[]>()
  const [startTime, setStartTime] = useState<string>()
  const [endTime, setEndTime] = useState<string>()
  const [description, setDescription] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [formErrors, setFormErrors] = useState<string | null>(null)
  const submit = useSubmit()

  useEffect(() => {
    const init = async () => {
      try {
        const clientData = await fetchClients()
        const stylistData = await fetchStylists()
        setClients(clientData)
        setStylists(stylistData)
        setFormErrors(null)

        if (appointment) {
          const scheduledClient = clientData.find(
            (client: ClientDTO) => client.clientId === appointment.clientId
          )
          const scheduledStylist = stylistData.find(
            (stylist: StylistDTO) => stylist.name === appointment.stylist
          )
          if (scheduledClient) {
            setClient(scheduledClient)
          }
          if (scheduledStylist) {
            setStylist(scheduledStylist)
          }
          const formattedDate = getFormattedDate(appointment.startTime)
          const appointmentStartTime = new Date(
            appointment.startTime
          ).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          const appointmentEndTime = new Date(
            appointment.endTime
          ).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          setAppointmentDate(formattedDate)
          setStartTime(appointmentStartTime)
          setEndTime(appointmentEndTime)
          setTitle(appointment.title)
          setDescription(appointment.description)
          setUserId(appointment.userId)
          setAppointmentId(appointment.appointmentId)
        } else {
          setUserId(user?.userId)
          setAppointmentId(0)
        }
      } catch (error) {
        if (error instanceof Error) {
          setFormErrors(
            `There was a problem initializing the appointment form: ${error.message}`
          )
        } else {
          setFormErrors(
            'There was an unknown error while initializing the appointment form'
          )
        }
      }
    }
    init()
  }, [appointment, user?.userId])

  //filter available appointment times and
  //populate start and end time select elements
  useEffect(() => {
    if (appointmentDate && stylist) {
      const fetchAvailableAppointmentTimes = async () => {
        try {
          const availableAppointmentTimes =
            await generateAvailableAppointmentTimes(
              stylist.stylistId,
              appointmentDate,
              client?.clientId
            )

          setStartTimeOptions(availableAppointmentTimes)
          setEndTimeOptions(availableAppointmentTimes)
        } catch (error) {
          if (error instanceof Error) {
            setFormErrors(`There was an error: ${error.message}`)
          } else {
            setFormErrors(
              'An unknown error occured while generating available appointment times'
            )
          }
        }
      }
      fetchAvailableAppointmentTimes()
    }
  }, [appointmentDate, stylist, client])

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleStylistChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedStylistId = Number(event.currentTarget.value)
    const selectedStylist = stylists?.find(
      (stylist) => stylist.stylistId === selectedStylistId
    )
    setStylist(selectedStylist)
  }

  const handleClientChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = Number(event.currentTarget.value)
    const selectedClient = clients?.find(
      (client) => client.clientId === selectedClientId
    )
    setClient(selectedClient)
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAppointmentDate(event.target.value)
  }

  const handleStartTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStartTime(event.target.value)
  }

  const handleEndTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  }

  const handleSubmit = async () => {
    if (client && stylist && appointmentDate && startTime && endTime) {
      try {
        const clientAppointments = await fetchClientAppointmentsByDate(
          client.clientId,
          appointmentDate
        )
        const stylistAppointments = await fetchStylistAppointmentsByDate(
          stylist.stylistId,
          appointmentDate
        )
        if (startTime >= endTime) {
          alert('Appointment start time must be before end time')
          return
        }
        if (
          isAppointmentConflict(
            clientAppointments,
            appointmentDate,
            startTime,
            endTime
          )
        ) {
          alert(`There is an appointment conflict with the client. 
                 Select another time or delete the conflicting appointment 
                 if you wish to schedule an appointment at this time`)
          return
        }
        if (
          isAppointmentConflict(
            stylistAppointments,
            appointmentDate,
            startTime,
            endTime
          )
        ) {
          alert(`The selected stylist has an appointment conflict during
                 the selected appointment time. Please choose another time.`)
          return
        }

        submit(
          {
            appointmentId: appointmentId,
            title: title,
            description: description,
            stylistId: stylist.stylistId,
            clientId: client.clientId,
            date: appointmentDate,
            startTime: startTime,
            endTime: endTime,
            userId: userId,
          } as SubmitTarget,
          {
            method: method,
          }
        )
      } catch (error) {
        throw json({
          message: `There was an error saving the appointment: ${error}`,
          status: 500,
        })
      }
    }
  }

  return (
    <Row className='ms-3 justify-content-center'>
      <Col md={10}>
        {formErrors && <h5 className='ps-2 text-danger'>{formErrors}</h5>}
        <Form className='p-3'>
          {appointment && (
            <Row className='mb-lg-2'>
              <Col xs={12} lg={6} className='mb-3'>
                <FormGroup>
                  <Row>
                    <Col
                      xs={12}
                      md={2}
                      className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                    >
                      <FormLabel htmlFor='id'>Id</FormLabel>
                    </Col>
                    <Col xs={9} md={7} lg={9} className='ps-0'>
                      <FormControl
                        id='id'
                        type='text'
                        name='id'
                        readOnly
                        disabled
                        defaultValue={appointment.appointmentId}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row className='mb-lg-2'>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={2}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='title'>Title</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} className='ps-0 '>
                    <FormControl
                      id='title'
                      name='title'
                      value={appointment?.title}
                      onChange={handleTitleChange}
                      defaultValue={appointment?.title}
                      required
                    />
                  </Col>
                </Row>
                {errors && errors.title && (
                  <p className='text-danger'>{errors.title}</p>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row className='mb-lg-2'>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={2}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='client'>Client</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} className='ps-0 '>
                    <FormSelect
                      id='clients'
                      name='clientId'
                      value={client?.clientId}
                      onChange={handleClientChange}
                      disabled={appointment ? true : false}
                      required
                    >
                      <option value=''>
                        {client ? client.name : 'Select Client'}
                      </option>
                      {clients?.map((client) => (
                        <option key={client.clientId} value={client.clientId}>
                          {client.name}
                        </option>
                      )) ?? []}
                    </FormSelect>
                  </Col>
                </Row>
                {appointment && (
                  <input
                    type='hidden'
                    name='clientId'
                    value={client?.clientId}
                  />
                )}
                {errors && errors.clientId && (
                  <p className='text-danger'>{errors.clientId}</p>
                )}
              </FormGroup>
            </Col>

            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={2}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='stylist'>Stylist</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} className='ps-0 '>
                    <FormSelect
                      id='stylists'
                      name='stylistId'
                      value={stylist?.stylistId}
                      onChange={handleStylistChange}
                      required
                    >
                      <option value=''>
                        {stylist ? stylist.name : 'Select Stylist'}
                      </option>
                      {stylists?.map((stylist) => (
                        <option
                          key={stylist.stylistId}
                          value={stylist.stylistId}
                        >
                          {stylist.name}
                        </option>
                      )) ?? []}
                    </FormSelect>
                  </Col>
                </Row>
                {errors && errors.stylistId && (
                  <p className='text-danger'>{errors.stylistId}</p>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row className='mb-lg-2'>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={2}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='date'>Date</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} className='ps-0'>
                    <FormControl
                      id='date'
                      type='date'
                      name='date'
                      value={appointmentDate}
                      onChange={handleDateChange}
                      required
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
          </Row>

          <Row className='mb-lg-2'>
            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={2}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='start'>Start</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} className='ps-0 '>
                    <FormSelect
                      id='start'
                      name='startTime'
                      value={startTime}
                      onChange={handleStartTimeChange}
                      required
                    >
                      <option>
                        {appointment
                          ? getFormattedLocalTime(appointment.startTime)
                          : 'Select Start Time'}
                      </option>
                      {startTimeOptions?.map((time: string) => (
                        <option key={time}>{time}</option>
                      ))}
                    </FormSelect>
                  </Col>
                </Row>
                {errors && errors.startTime && (
                  <p className='text-danger'>{errors.startTime}</p>
                )}
              </FormGroup>
            </Col>

            <Col xs={12} lg={6} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col
                    xs={12}
                    md={2}
                    className='justify-content-center pe-0 pe-lg-2 me-lg-2'
                  >
                    <FormLabel htmlFor='end'>End</FormLabel>
                  </Col>
                  <Col xs={9} md={7} lg={9} className='ps-0'>
                    <FormSelect
                      id='end'
                      name='endTime'
                      value={endTime}
                      onChange={handleEndTimeChange}
                      required
                    >
                      <option>
                        {appointment
                          ? getFormattedLocalTime(appointment.endTime)
                          : 'Select End Time'}
                      </option>
                      {endTimeOptions?.map((time: string) => (
                        <option key={time}>{time}</option>
                      ))}
                    </FormSelect>
                  </Col>
                </Row>
                {errors && errors.endTime && (
                  <p className='text-danger'>{errors.endTime}</p>
                )}
              </FormGroup>
            </Col>
          </Row>

          <Row className='mb-lg-2'>
            <Col xs={12} lg={9} className='mb-3'>
              <FormGroup>
                <Row>
                  <Col xs={12}>
                    <FormLabel htmlFor='description'>Description</FormLabel>
                  </Col>
                  <Col xs={9} lg={10}>
                    <FormControl
                      id='description'
                      name='description'
                      as='textarea'
                      rows={3}
                      value={description}
                      onChange={handleDescriptionChange}
                      required
                    />
                  </Col>
                </Row>
                {errors && errors.description && (
                  <p className='text-danger'>{errors.description}</p>
                )}
              </FormGroup>
            </Col>
          </Row>

          {/*<input name='appointmentId' type='hidden' value={appointmentId} />*/}
          <input name='userId' type='hidden' value={userId} />

          <div className='mx-2 d-grid gap-2 d-md-flex justify-content-md-end me-md-5 pe-md-5'>
            <Button
              className='btn-block btn-md-inline'
              onClick={() => navigate('..')}
            >
              Cancel
            </Button>{' '}
            <Button
              className='btn-block btn-md-inline'
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default AppointmentForm
