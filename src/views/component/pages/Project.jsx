import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Dropdown, Row } from "react-bootstrap";
import { CgPen, CgTrash } from "react-icons/cg";
import { Link } from "react-router-dom";
import { ProjectService } from "services";
import { AddProject } from "../components";
import { AddModal } from "../components/modal";
import { Header } from "../layout";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import JsPDF from "jspdf";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [modalContent, setModalContent] = useState();

  const deleteProject = (id) => {
    ProjectService.deleteProject(id)
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dismissModalContent = () => {
    setModalContent();
    window.location.reload();
  };

  const title = <h4 className="font-weight-bold m-3">Add Project</h4>;

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await ProjectService.getProjects();
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, []);

  const handleAddModal = (content, onSubmit, onClose) => {
    setModalContent({
      head: title,
      children: content,
      onHide: dismissModalContent,
      onSubmit: onSubmit,
      onClose: dismissModalContent,
    });
  };

  const addProject = () => {
    handleAddModal(<AddProject />);
  };

  const exportToPDF = () => {
    const data = projects.map((project) => [
      project.taskTitle,
      project.taskDescription,
      project.client,
      project.assignToName,
      project.priority,
      project.status,
    ]);

    const marginLeft = 15;
    const doc = new JsPDF();

    doc.setFontSize(15);

    const title = "Project List";

    const headers = [
      [
        "Judul Program",
        "Deskripsi",
        "Client",
        "Assign To",
        "Prioritas",
        "Status",
      ],
    ];

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 35);
    doc.autoTable(content);
    doc.save("project.pdf");
  };

  const headers = [
    { label: "Judul Program", key: "taskTitle" },
    { label: "Deskripsi", key: "taskDescription" },
    { label: "Client", key: "client" },
    { label: "Assign To", key: "assignToName" },
    { label: "Prioritas", key: "priority" },
    { label: "Status", key: "status" },
  ];

  return (
    <Header>
      <AddModal show={Boolean(modalContent)} {...modalContent} />

      <h1 className="font-weight-bolder mb-5">Project</h1>
      <div className="d-flex justify-content-start pl-3">
        <Row>
          <Col className="col-6">
            <Button onClick={addProject} className="btn btn-primary btn-block">
              Add
            </Button>
          </Col>
          <Col className="col-6">
            <Dropdown as={ButtonGroup}>
              <Button className="btn btn-primary btn-block">Export</Button>

              <Dropdown.Toggle
                split
                className="btn btn-primary"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu className="primary">
                <Dropdown.Item
                  onClick={exportToPDF}
                  className="font-weight-bold"
                >
                  PDF
                </Dropdown.Item>
                <CSVLink
                  data={projects}
                  headers={headers}
                  filename="Project.csv"
                  className="dropdown-item font-weight-bold"
                >
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Project</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="example"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Client</th>
                  <th>Assign To</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Client</th>
                  <th>Assign To</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </tfoot>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.taskTitle}</td>
                    <td>{project.taskDescription}</td>
                    <td>{project.client}</td>
                    <td>{project.assignToName}</td>
                    {/* <td>{project.priority}</td> */}
                    {project.priority === "Low" ? (
                      <td>
                        <div className="badge badge-pill badge-success">
                          {project.priority}
                        </div>
                      </td>
                    ) : project.priority === "Medium" ? (
                      <td>
                        <div className="badge badge-pill badge-warning">
                          {project.priority}
                        </div>
                      </td>
                    ) : (
                      project.priority === "High" && (
                        <td>
                          <div className="badge badge-pill badge-danger">
                            {project.priority}
                          </div>
                        </td>
                      )
                    )}
                    {/* <td>{project.status}</td> */}

                    {project.status === "Done" ? (
                      <td>
                        <div className="badge badge-pill badge-success">
                          {project.status}
                        </div>
                      </td>
                    ) : project.status === "Ongoing" ? (
                      <td>
                        <div className="badge badge-pill badge-warning">
                          {project.status}
                        </div>
                      </td>
                    ) : (
                      project.status === "Not Yet" && (
                        <td>
                          <div className="badge badge-pill badge-danger">
                            {project.status}
                          </div>
                        </td>
                      )
                    )}
                    <td>
                      <div className="d-inline-flex">
                        <Link
                          className="btn btn-outline-info"
                          to={`/edit-project/${project.id}`}
                        >
                          <CgPen />
                        </Link>
                        {/* <button className='btn btn-outline-info' onClick={() => editFreelancer(freelancer.id)}>
                        <CgPen />
                      </button> */}
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteProject(project.id)}
                          style={{ marginLeft: "10px" }}
                        >
                          <CgTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Project;
