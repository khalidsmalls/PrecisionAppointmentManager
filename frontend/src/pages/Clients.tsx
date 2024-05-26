import { Link, useRouteLoaderData, json } from 'react-router-dom'
import ClientRecordsList from '../components/ClientRecordsList'
import { Client } from '../types/Client'
import { Button, Col } from 'react-bootstrap'
import { ClientSearchForm } from '../components/ClientSearchForm'
import { ChangeEvent, FormEvent, useState } from 'react'
import { getJwt } from '../utils/authFunctions'
import Row from 'react-bootstrap/Row'

const Clients = () => {
  let url = 'http://localhost:8080/api/clients'
  const [clients, setClients] = useState(
    useRouteLoaderData('clients') as Client[]
  )
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const jwt = getJwt()
    if (!jwt) {
      return
    }
    if (searchTerm !== '') {
      url = `http://localhost:8080/api/clients/search?searchTerm=${searchTerm.trim()}`
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    })
    if (!response.ok) {
      throw json(
        { message: 'there was an error fetching clients' },
        { status: 500 }
      )
    }
    const responseData = await response.json()
    setClients(responseData)
  }

  return (
    <div className='p-3'>
      <div className='mb-3'>
        <h1 className='display-5 text-secondary'>Clients</h1>
      </div>
      <Row className='mb-5'>
        <Col md={9} lg={6}>
          <ClientSearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
          />
        </Col>
      </Row>

      {clients && clients.length > 0 ? (
        <div className='my-3'>
          <ClientRecordsList list={clients} />
        </div>
      ) : (
        <div className='mt-5 d-flex justify-content-center'>
          <p>There are currently no clients</p>
        </div>
      )}

      <div className='d-flex justify-content-end'>
        <Link to='new'>
          <Button>New Client</Button>
        </Link>
      </div>
    </div>
  )
}

export default Clients
