import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  projectPriority,
  projectStatus,
} from "../../../contants/projectStatus";
import { IPriority, ITask, ITaskType } from "../../../interfaces/Project";
import { ISpinner } from "../../../interfaces/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addNewTaskInDb, editTaskInDb } from "../../../Services/api/tasksApi";
import { triggerToGetProjectDetail } from "../../../redux/projectSlice";
import { RootState } from "../../../redux/store";

interface IProps {
  openModal: boolean;
  sinleTaskDetail: ITask;
  modalType: string;
  popupEvent: any;
}

interface ITaskDetail extends ITask {
  formData?: any;
}
const AddOrEditTask: React.FC<IProps> = (props: IProps) => {
  const { openModal, modalType } = props;
  const [sinleTaskDetail, setSinleTaskDetail] = useState<ITaskDetail>(Object);
  const [addEDitSpinner, setAddEDitSpinner] = useState<ISpinner>({
    state: false,
    text: "",
  });
  const { formData } = sinleTaskDetail;
  const projectDetailFromStore = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch();


  useEffect(() => {
    let taskDetail: ITaskDetail;
    if (modalType === "add") {
      taskDetail = {
        title: "",
        description: "",
        developer: "",
        dueDate: "",
        status: "",
        priority: IPriority.low,
        _id: "",
        project: "",
        type: ITaskType.task,
        createdBy: "",
        formData: new FormData(),
      };
    } else {
      taskDetail = {
        ...props.sinleTaskDetail,
        formData: new FormData()
        };
    }
    setSinleTaskDetail(taskDetail);
  }, [modalType, props.sinleTaskDetail]);

  const popupEvent = () => {
    props.popupEvent(false);
  };

  const handleInputChange = (name: string) => (event: any) => {
    const value = event.target.value;
    formData.set(name, value);
    setSinleTaskDetail({ ...sinleTaskDetail, [name]: value });
  };

  const addEditTask = (actionType: string) => {
    setAddEDitSpinner({ state: true, text: "" });
      formData.set("project", projectDetailFromStore.projectDetail._id);
    if (actionType === "add") {
      makeFormFieldsEmpty();

      addNewTaskInDb(formData)
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
          setAddEDitSpinner({ state: false, text: "" });
          props.popupEvent(false);
          dispatch(triggerToGetProjectDetail(false));
        });
    } else {
      editTaskInDb(sinleTaskDetail._id, formData)
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
          setAddEDitSpinner({ state: false, text: "" });
          props.popupEvent(false);
          dispatch(triggerToGetProjectDetail(false));
        });
    }
  };

  const makeFormFieldsEmpty = () => {
    const taskDetail = {
      title: "",
      description: "",
      developer: "",
      dueDate: "",
      status: "",
      priority: IPriority.low,
      _id: "",
      project: "",
      createdBy: "",
      type: ITaskType.task,
      formData: new FormData(),
    };
    setSinleTaskDetail(taskDetail);
  };

  return (
    <Modal show={openModal} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          <h5 className="mb-0 fs-6 text-capitalize">
            {modalType === "add" ? "add New Project" : "Edit Project"}
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" as={Row}>
            <Col md={9}>
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              placeholder="Title"
              value={sinleTaskDetail.title}
              onChange={handleInputChange("title")}
            />
            </Col>
            <Col md={3}>
            <Form.Label>Task Type</Form.Label>
            <Form.Select
                  placeholder="Type"
                  className="text-capitalize"
                  onChange={handleInputChange("type")}
                  value={sinleTaskDetail.type}
                >
                  {['task','bug'].map((type: string, index: number) => {
                    return (
                      <option value={type} key={index}>
                        {type}
                      </option>
                    );
                  })}
                </Form.Select>
            </Col>
            
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              as="textarea"
              onChange={handleInputChange("description")}
              placeholder="Description"
              rows={3}
              value={sinleTaskDetail.description}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  placeholder="Status"
                  className="text-capitalize"
                  onChange={handleInputChange("status")}
                  value={sinleTaskDetail.status}
                >
                  {projectStatus.map((status: string, index: number) => {
                    return (
                      <option value={status} key={index}>
                        {status}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  placeholder="Status"
                  className="text-capitalize"
                  onChange={handleInputChange("priority")}
                  value={sinleTaskDetail.priority}
                >
                  {projectPriority.map((status: string, index: number) => {
                    return (
                      <option value={status} key={index}>
                        {status}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Developer</Form.Label>
                <Form.Select
                  placeholder="Developer"
                  className="text-capitalize"
                  onChange={handleInputChange("developer")}
                  value={sinleTaskDetail.developer}
                >
                  {projectStatus.map((status: string, index: number) => {
                    return (
                      <option value={status} key={index}>
                        {status}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={sinleTaskDetail.dueDate}
                  onChange={handleInputChange("dueDate")}
                  placeholder="Due Date"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={popupEvent}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => addEditTask(modalType === "add" ? "add" : "edit")}
          disabled={addEDitSpinner.state}
        >
          {modalType === "add" && addEDitSpinner.state
            ? "Adding Task..."
            : modalType === "add" && !addEDitSpinner.state
            ? "Adding Task"
            : modalType === "edit" && addEDitSpinner.state
            ? "Saving Changes..."
            : modalType === "edit" && !addEDitSpinner.state
            ? "Save Task"
            : ""}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddOrEditTask;
