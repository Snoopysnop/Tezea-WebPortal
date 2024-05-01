import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Table, InputGroup, Button, Form, Dropdown } from 'react-bootstrap';

const TaskContainer: React.FC = () => {
  enum TaskStatus {
    toComplete = "A compléter",
    inProgress = "En cours",
    Terminate = "Terminé",
    Archiver = "Archivé",
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
    { id: 2, name: "Chantier 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.inProgress },
    { id: 3, name: "Chantier 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
    { id: 4, name: "Chantier Test 1", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Terminate },
    { id: 5, name: "Chantier Test 2", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Terminate },
    { id: 6, name: "Chantier Test 3", date: "10/10/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Terminate },
    { id: 7, name: "Chantier Test 14", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
    { id: 8, name: "Chantier Test 24", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
    { id: 9, name: "Chantier Test 35", date: "10/11/2024", startHours: "2PM", endHour: "4PM", address: "2 Fox Street, NY", status: TaskStatus.Archiver },
  ];

  const SquareDiv: React.FC<{ taskName: string }> = ({ taskName }) => {
    return (
      <div className="square-container" style={{ marginBottom: '20px' }}>
        <div style={{ width: '150px', height: '150px', backgroundColor: 'white', borderRadius: '10px', border: '1px solid black' }}>
          <div style={{ height: '10px', backgroundColor: 'orange', borderRadius: '10px 10px 0 0', borderBottom: '1px solid grey' }}></div>
          <p>{taskName}</p>
        </div>
      </div>
    );
  };


  // Initialiser de la map de Date et Taches
  const mapDateTasks = new Map<string, Task[]>();
  tasks.forEach(task => {
    const taskList = mapDateTasks.get(task.date) || [];
    taskList.push(task);
    mapDateTasks.set(task.date, taskList);
  });

  return (
    <Container>
      <Row className="justify-content-left mt-4">
        <Col>
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

      {/* Parcourir chaque date dans tasksByDate et afficher les tâches correspondantes */}
      <Container>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>A compléter</th>
                <th>En cours</th>
                <th>Terminer</th>
                <th>Archiver</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(mapDateTasks.entries()).map(([date, tasks]) => (
                <tr key={date}>
                  <td>{date}</td>
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.toComplete)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.inProgress)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.Terminate)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.Archiver)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
    </Container>
  );
};

export default TaskContainer;
