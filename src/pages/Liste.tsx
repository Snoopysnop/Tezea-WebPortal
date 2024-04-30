import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form } from 'react-bootstrap'; // Import des composants Bootstrap

const Liste: React.FC = () => {

  enum TaskStatus {
    toComplete = "toComplete",
    inProgress = "inProgress",
    Terminate = "terminate",
    Archiver = "archiver",
  }

  interface Task {
    id: number
    name: string
    date: string
    startHours: string
    endHour: string
    address: string
    status: TaskStatus
  }

  const tasks: Task[] = [
    { id: 1, name: "Chantier 1", date: "10/10/2024", startHours: "5PM", endHour: "9PM", address: "2 Fox Street, NY", status: TaskStatus.toComplete },
    { id: 2, name: "Chantier 2", date: "11/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.inProgress },
    { id: 3, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
    { id: 4, name: "Chantier Test 1", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Terminate },
    { id: 5, name: "Chantier Test 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Terminate },
    { id: 6, name: "Chantier Test 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Terminate },
    { id: 4, name: "Chantier Test 14", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
    { id: 5, name: "Chantier Test 24", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
    { id: 6, name: "Chantier Test 35", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
  ];

  const SquareDiv: React.FC<{ taskName: string }> = ({ taskName }) => {
    return (
      <div className="square-container" style={{ marginBottom: '20px' }}>
        <div style={{ width: '120px', height: '120px', backgroundColor: 'grey', borderRadius: '10px' }}>
          <p>{taskName}</p>
        </div>
      </div>
    );
  };

  const renderTaskRowsByDate = (tasks: Task[]) => {
    // Grouper les tâches par date
    const tasksByDate: { [key: string]: Task[] } = {};
    tasks.forEach(task => {
      if (!tasksByDate[task.date]) {
        tasksByDate[task.date] = [];
      }
      tasksByDate[task.date].push(task);
    });

    // Créer les lignes pour chaque date avec max 2 éléments par ligne
    const rows: JSX.Element[] = [];
    for (const date in tasksByDate) {
      const tasksForDate = tasksByDate[date];
      const rowsForDate: JSX.Element[] = [];

      for (let i = 0; i < tasksForDate.length; i += 2) {
        rowsForDate.push(
          <Row key={`${date}_${i}`}>
            <Col>
              <SquareDiv taskName={tasksForDate[i].name} />
            </Col>
            {i + 1 < tasksForDate.length && (
              <Col>
                <SquareDiv taskName={tasksForDate[i + 1].name} />
              </Col>
            )}
          </Row>
        );
      }

      rows.push(
        <React.Fragment key={date}>
          <tr>
            <td colSpan={4} className="text-center"><b>{date}</b></td>
          </tr>
          <tr>
            <td colSpan={4}>
              {rowsForDate}
            </td>
          </tr>
        </React.Fragment>
      );
    }
    return rows;
  };

  return (
    <Container>
      {/* Barre de recherche */}
      <Row className="justify-content-left mt-4">
        <Col className="d-flex align-item-center ">
          <InputGroup className=" w-50">
            <Form.Control
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
            />

            <Button variant="outline-secondary" id="button-addon1">
              Button
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row className="mt-4 col-lg-12">
        <Col>
          <Table>
            <tbody>
              <tr>
                <th>A compléter</th>
                <th>En cours</th>
                <th>Terminer</th>
                <th>Archiver</th>
              </tr>
              <tr>
                <td>{renderTaskRowsByDate(tasks.filter(task => task.status === TaskStatus.toComplete))}</td>
                <td>{renderTaskRowsByDate(tasks.filter(task => task.status === TaskStatus.inProgress))}</td>
                <td>{renderTaskRowsByDate(tasks.filter(task => task.status === TaskStatus.Terminate))}</td>
                <td>{renderTaskRowsByDate(tasks.filter(task => task.status === TaskStatus.Archiver))}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Liste;
