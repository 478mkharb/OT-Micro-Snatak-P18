import react, * as React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import Doc from './DocService';
import PdfContainer from './PdfContainer';

class ListSalary extends React.Component {
        constructor(props) {
                super(props)
                this.state = { data: [] }
        }

        loadData() {
                fetch('/salary/search/all')
                        .then(response => response.ok ? response.json() : [])
                        .then(data => {
                                this.setState({data: Array.isArray(data) ? data : [] })
                })
                        .catch(err => console.error(err.toString()))
        }

        componentDidMount() {
                this.loadData()
        }

  render() {
      return (
          <SiteWrapper>
          <Page.Card title="Salary List"></Page.Card>
          <Grid.Col md={12} lg={10} className="align-self-center">
          <PdfContainer createPdf={Doc.createPdf}>
          <Table>
            <Table.Header><Table.Row>
                 <Table.ColHeader>Employee ID</Table.ColHeader>
                 <Table.ColHeader>Name</Table.ColHeader>
                 <Table.ColHeader>Salary Amount</Table.ColHeader>
                 <Table.ColHeader>Status</Table.ColHeader>
            </Table.Row></Table.Header>
            <Table.Body>
           { this.state.data.length > 0 ? this.state.data.map((item, i) => {
                return (
                    <Table.Row key={i}>
                        <Table.Col>{item.id}</Table.Col>
                        <Table.Col>{item.name}</Table.Col>
                        <Table.Col>{item.salary || item.annual_package || 0}</Table.Col>
                        <Table.Col>{item.status || 'Active'}</Table.Col>
                    </Table.Row>
                );
                }) : <Table.Row><Table.Col colSpan="4">No records found.</Table.Col></Table.Row>
            }
            </Table.Body>
            </Table>
            </PdfContainer>
          </Grid.Col>
          </SiteWrapper>
      );
  }
}
export default ListSalary;
