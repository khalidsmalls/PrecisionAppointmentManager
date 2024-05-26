import FormLabel from 'react-bootstrap/FormLabel'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { ChangeEvent, FormEvent } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type props = {
  searchTerm: string
  onSearchInput: (event: ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const ClientSearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: props) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <Row>
        <Col xs={12}>
          <FormLabel htmlFor='search'>
            <strong>Search:</strong>{' '}
          </FormLabel>
        </Col>
        <Col xs={7} sm={6} md={7} lg={7} xxl={6}>
          <FormControl
            id='search'
            value={searchTerm}
            onChange={onSearchInput}
          />
        </Col>
        <Col xs={12} sm={2} className='mt-2 mt-sm-0'>
          <Button type='submit'>Submit</Button>
        </Col>
      </Row>
    </form>
  )
}
