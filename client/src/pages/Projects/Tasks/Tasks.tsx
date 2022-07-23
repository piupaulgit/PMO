import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Container,
  Modal,
  Nav,
  NavDropdown,
  NavItem,
  Table,
} from "react-bootstrap";
import { Bug, File, Inbox, Pencil, ThreeDots, Trash3 } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import {
  ITask,
  IPriority,
  IProjectOrTaskStatus,
} from "../../../interfaces/Project";
import { ISpinner } from "../../../interfaces/Spinner";
import { RootState } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { deleteTaskFromDb } from "../../../Services/api/tasksApi";
import AddOrEditTask from "./AddOrEditTask";
import {
  triggerToGetProjectDetail
} from "../../../redux/projectSlice";


const Tasks: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [taskSpinner, setTaskSpinner] = useState<ISpinner>({
    state: false,
    text: "",
  });
  const [currentTask, setCurrentTask] = useState<ITask>(Object);
  const [modalType, setModalType] = useState<string>("");
  const projectDetailFromStore = useSelector(
    (state: RootState) => state.project
  );
  const [taskDetails, setTaskDetails] = useState<ITask[]>([]);
  const dispatch = useDispatch();


  useEffect(() => {
    setTaskDetails(projectDetailFromStore.projectDetail.tasks);
  }, [projectDetailFromStore.projectDetail]);

  const deleteTask = () => {
    setTaskSpinner({ state: true, text: "" });
    deleteTaskFromDb(currentTask._id)
      .then((res) => {
        if (res.status) {
          toast.success(res.message); 
          dispatch(triggerToGetProjectDetail(true));
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setTaskSpinner({ state: false, text: "" });
        setOpenDeleteModal(false);
        dispatch(triggerToGetProjectDetail(false));
      });
  };

  const popupEvent = (val: boolean) => {
    setOpenModal(val);
  };

  return (
    <Container className="mt-5 p-0">
      <Button
        variant="primary"
        className="float-end"
        onClick={() => {
          setOpenModal(true);
          setCurrentTask(Object);
          setModalType("add");
        }}
      >
        Add Task
      </Button>
      {taskDetails?.length > 0 ? (
        <Table className="pmo-table align-middle">
          <thead>
            <tr>
              <td className="text-center">Serial No:</td>
              <td>Type</td>
              <td>Title</td>
              <td>Status</td>
              <td>Priority</td>
              <td>Developer</td>
              <td>Created By</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {taskDetails.map((task, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setOpenModal(true);
                    setCurrentTask(task);
                    setModalType("edit");
                  }}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-capitalize">
                    {task.type === "bug" ? (
                      <Bug className="text-danger" />
                    ) : (
                      <Inbox className="text-warning" />
                    )}
                  </td>
                  <td className="text-capitalize">{task.title}</td>

                  <td>
                    <Badge
                      pill
                      className="text-capitalize"
                      bg={
                        task.status === IProjectOrTaskStatus.inProgress
                          ? "info"
                          : task.status === IProjectOrTaskStatus.onHold
                          ? "secondary"
                          : task.status === IProjectOrTaskStatus.closed
                          ? "danger"
                          : task.status === IProjectOrTaskStatus.new
                          ? "primary"
                          : task.status === IProjectOrTaskStatus.done
                          ? "success"
                          : ""
                      }
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge
                      pill
                      className="text-capitalize"
                      bg={
                        task.priority === IPriority.low
                          ? "info"
                          : task.priority === IPriority.medium
                          ? "warning"
                          : task.priority === IPriority.high
                          ? "danger"
                          : ""
                      }
                    >
                      {task.priority}
                    </Badge>
                  </td>
                  <td>{task.developer || "not assigned"}</td>
                  <td>{task.createdBy || "unknown"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <Nav className="justify-content-center">
                      <NavDropdown
                        className="pmo-dropdown"
                        title={<ThreeDots></ThreeDots>}
                      >
                        <NavItem>
                          <Nav.Link
                            onClick={() => {
                              setOpenModal(true);
                              setCurrentTask(task);
                              setModalType("edit");
                            }}
                          >
                            <Pencil className="me-2" />
                            Edit
                          </Nav.Link>
                        </NavItem>
                        <NavItem>
                          <Nav.Link
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setCurrentTask(task);
                            }}
                          >
                            <Trash3 className="me-2 text-danger" />
                            Delete
                          </Nav.Link>
                        </NavItem>
                      </NavDropdown>
                    </Nav>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h5>No Task assigned under this project</h5>
      )}
      {currentTask && (
        <AddOrEditTask
          openModal={openModal}
          sinleTaskDetail={currentTask}
          modalType={modalType}
          popupEvent={popupEvent}
        ></AddOrEditTask>
      )}
      {/* delete confirmation Modal */}
      <Modal show={openDeleteModal} onHide={() => setOpenDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to {currentTask.title}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenDeleteModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteTask()}
            disabled={taskSpinner.state}
          >
            {taskSpinner.state ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Tasks;
