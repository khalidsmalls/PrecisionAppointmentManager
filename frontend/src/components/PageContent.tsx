import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const PageContent = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <Row className='mt-5'>
      <Col>
        <Row>
          <Col xs={12}>
            <h3>{title}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div>{children}</div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PageContent
