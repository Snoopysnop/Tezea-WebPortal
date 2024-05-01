import React, { useEffect, useState } from 'react';
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
    id: number;
    name: string;
    date: string;
    startHours: string;
    endHour: string;
    address: string;
    status: TaskStatus;
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

  const mapDateTasks = new Map<string, Task[]>();
  tasks.forEach(task => {
    const taskList = mapDateTasks.get(task.date) || [];
    taskList.push(task);
    mapDateTasks.set(task.date, taskList);
  });

  const allStatus: TaskStatus[] = Object.values(TaskStatus);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus[]>([]);

  const [checkboxes, setCheckboxes] = useState<{ [key in TaskStatus]?: boolean }>({});

  const handleStatusChange = (status: TaskStatus) => {
    const updatedCheckboxes = { ...checkboxes, [status]: !checkboxes[status] };
    setCheckboxes(updatedCheckboxes);

    setSelectedStatus(Object.keys(updatedCheckboxes).filter(key => updatedCheckboxes[key as TaskStatus]) as TaskStatus[]);
  };

  useEffect(() => {
    // Rafraîchir les cases à cocher ici
    const updatedCheckboxes: { [key in TaskStatus]?: boolean } = {};
    selectedStatus.forEach(status => {
      updatedCheckboxes[status] = true;
    });
    setCheckboxes(updatedCheckboxes);
  }, [selectedStatus]);

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

      <Row className="mt-4">
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filtrer
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.values(TaskStatus).map((status, index) => (
                <Dropdown.Item key={index}>
                  <Form.Check
                    type="checkbox"
                    label={status}
                    checked={!!checkboxes[status]}
                    onChange={() => handleStatusChange(status)}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Container>
        <Table>
          <thead>
            <tr>
              {selectedStatus.length > 0 && <th>Date</th>}
              {selectedStatus.includes(TaskStatus.toComplete) && <th>A compléter </th>}
              {selectedStatus.includes(TaskStatus.inProgress) && <th>En cours</th>}
              {selectedStatus.includes(TaskStatus.Terminate) && <th>Terminer</th>}
              {selectedStatus.includes(TaskStatus.Archiver) && <th>Archiver</th>}
            </tr>
          </thead>
          <tbody>
            {Array.from(mapDateTasks.entries()).map(([date, tasks]) => (
              <tr key={date}>
                {selectedStatus.length > 0 && <td>{date}</td>}
                {selectedStatus.includes(TaskStatus.toComplete) && (
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.toComplete)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                )}
                {selectedStatus.includes(TaskStatus.inProgress) && (
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.inProgress)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                )}
                {selectedStatus.includes(TaskStatus.Terminate) && (
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.Terminate)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                )}
                {selectedStatus.includes(TaskStatus.Archiver) && (
                  <td>
                    {tasks
                      .filter(task => task.status === TaskStatus.Archiver)
                      .map(task => <SquareDiv key={task.id} taskName={task.name} />)
                    }
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default TaskContainer;
