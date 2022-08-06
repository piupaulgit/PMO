import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import ImageHelper from "../../../components/ImageHepler/ImageHelper";
import { IProject, IProjectOrTaskStatus } from "../../../interfaces/Project";
import { ISpinner } from "../../../interfaces/Spinner";
import { getSingleProjectDetailFromDb } from "../../../Services/api/projectsApi";
import Utilities from "../../../Services/helpers/utilities";
import Tasks from "../Tasks/Tasks";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import Select from "react-select";
import { getAllUsers } from "../../../Services/api/auth";
import { updateCurrentProjectDetail } from "../../../redux/projectSlice";
import {IUser, IUserDropdown} from '../../../interfaces/User';
import AvatarImage from '../../../components/AvatarImage/AvatarImage';

const ProjectDetail: React.FC = () => {
  const [projectIdFromUrl, setProjectIdFromUrl] = useSearchParams();
  const [pageSpinner, setPageSpinner] = useState<ISpinner>({
    state: false,
    text: "",
  });
  const projectDetailFromStore = useSelector(
    (state: RootState) => state.project
  );
  const projectId = projectIdFromUrl.get("id") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectDetailFromStore.loadProjectDetail) singleProjectDetail();
  }, [projectDetailFromStore.loadProjectDetail]);

  const singleProjectDetail = () => {
    setPageSpinner({ state: true, text: "Loading Project Detail..." });
    getSingleProjectDetailFromDb(projectId)
      .then((res) => {
        const projectDevs:any = []
        res.data.developers.forEach((dev:any) => {
          const devObj = {
            value : dev._id,
            label : dev.name,
          }
          projectDevs.push(devObj)
        });
        res.data.developers = projectDevs;
        dispatch(updateCurrentProjectDetail(res.data));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPageSpinner({ state: false, text: "" });
      });
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState([
    { value: "chocolate", label: "Chocolate" },
  ]);

  const handleChange = (e: any) => {
    setSelectedOption(e);
  };

  useEffect(() => {
    singleProjectDetail();
    const getDevelopers = () => {
      const payload = {
        filter: {
          role: "developer",
        },
      };
      getAllUsers(payload).then((data) => {
        console.log(data);
      });
    };
    getDevelopers();
  }, [projectIdFromUrl]);

  useEffect(() => {
    if (projectDetailFromStore.loadProjectDetail) singleProjectDetail();
    console.log("ioioio")
  }, [projectDetailFromStore.loadProjectDetail]);

  return (
    <div className="project-detail">
      <Header pageTitle="Project Detail"></Header>

      <Container className="p-5 page-content-container">
        {pageSpinner.state ? (
          <span className="spinner-holder">
            <Spinner animation="border" />
            {pageSpinner.text}
          </span>
        ) : (
          <Row>
            <div>
              <Link
                to={`/edit-project?id=${projectDetailFromStore.projectDetail._id}`}
                className="btn btn-primary mb-2 float-end"
              >
                Edit Project
              </Link>
            </div>
            <Col sm="7">
              <Card className="p-4 border-0 shadow-none">
                <Row>
                  <Col sm="2">
                    <ImageHelper
                      projectDetail={{
                        projectId: projectDetailFromStore.projectDetail._id,
                        isLogoPresent: projectDetailFromStore.projectDetail.isLogoUploaded,
                      }}
                    ></ImageHelper>
                  </Col>
                  <Col sm="10">
                    <Card.Title className="d-flex justify-content-between">
                      {projectDetailFromStore.projectDetail.title}
                      <Badge
                        pill
                        className="text-capitalize"
                        bg={
                          projectDetailFromStore.projectDetail.status ===
                          IProjectOrTaskStatus.inProgress
                            ? "info"
                            : projectDetailFromStore.projectDetail.status ===
                              IProjectOrTaskStatus.onHold
                            ? "secondary"
                            : projectDetailFromStore.projectDetail.status ===
                              IProjectOrTaskStatus.closed
                            ? "danger"
                            : projectDetailFromStore.projectDetail.status === IProjectOrTaskStatus.new
                            ? "primary"
                            : projectDetailFromStore.projectDetail.status === IProjectOrTaskStatus.done
                            ? "success"
                            : ""
                        }
                      >
                        {projectDetailFromStore.projectDetail.status}
                      </Badge>
                    </Card.Title>
                    <p>{projectDetailFromStore.projectDetail.description}</p>
                  </Col>
                  <Col sm={12}>
                    <h5>
                      <strong>Budget: </strong> {projectDetailFromStore.projectDetail.budget}
                    </h5>
                  </Col>
                  <Col sm={12} className="mt-3">
                    <Row>
                      <Col sm={6}>
                        <h6 className="d-flex align-items-center mb-1">
                          <Calendar className="text-primary me-2"></Calendar>
                          <strong>Start Date</strong>
                        </h6>
                        <p className="mb-0">
                          {Utilities.getFormatedDate(projectDetailFromStore.projectDetail.startDate)}
                        </p>
                      </Col>
                      <Col sm={6}>
                        <h6 className="d-flex align-items-center mb-1">
                          <Calendar className="text-primary me-2"></Calendar>
                          <strong>Due Date</strong>
                        </h6>
                        <p className="mb-0">
                          {Utilities.getFormatedDate(projectDetailFromStore.projectDetail.dueDate)}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="5">
              <Card className="p-4 border-0 shadow-none">
                <Card.Title>Team Members</Card.Title>
                <Select
                  isMulti={true}
                  defaultValue={selectedOption}
                  onChange={(e: any) => handleChange(e)}
                  options={options}
                />
                    <Card.Body className='p-0'>
                        <ListGroup>
                            {projectDetailFromStore.projectDetail.developers && projectDetailFromStore.projectDetail.developers.map((developer: IUserDropdown) => {
                                return (
                                    <ListGroup.Item className='d-flex align-items-center' key={developer.id}>
                                        <AvatarImage name={developer?.label}></AvatarImage>
                                        <h6 className='m-0 d-inline'>
                                            {developer?.label}
                                        </h6>
                                        {/* <Badge bg='info'>
                                        Frontend Dev.
                                    </Badge> */}
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {projectDetailFromStore.projectDetail.tasks && <Tasks></Tasks>}
      </Container>
    </div>
  );
};

export default ProjectDetail;
