import React, { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Col, DatePicker, Input, Modal, notification, Row, Select, Spin } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form'
import { schema } from '../../Common/Schema';
import { optionsGender } from '../../Common/OptionsGender';
import { options } from '../../Common/OptionsFavourites';
import { optionsSchool } from '../../Common/OptionsSchool';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clear_user, getUser } from '../../app/UsersSlice';
import { deleteUser } from '../../Services/DeleteUser';
import { patchUser } from '../../Services/PatchUser';
import moment from 'moment';
import './Detail.css'
import { timeOut } from '../../Utils/timeOutBackHome';
import { isObjectEqual } from '../../Utils/IsObjectEqual';

export default function Detail() {
  const dateFormat = 'DD/MM/YYYY';
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [stopLoading, setStopLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [openDisabled, setOpenDisabled] = useState(false)
  const { control, handleSubmit, setValue, reset, watch, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  })
  const openNotification = (placement, des) => {
    api.info({
      message: `Notification`,
      description: des,
      placement,
    });
  };
  const dataUser = useSelector(store => store.users).user
  const dataUpdate = useRef(watch())
  if (isLoading) {
    setTimeout(() => {
      setStopLoading(true)
    }, 3000)
  }
  useEffect(() => {
    setIsLoading(true)
    const getDataUser = async () => {
      try {
        await dispatch(getUser(`/users/${userId}`))
        if (Object.keys(dataUser).length > 0) {
          setIsLoading(false)
        }
        else setIsLoading(true)
      } catch (error) {
        setIsLoading(true)
      }
    }
    getDataUser()
  }, [userId]);
  useEffect(() => {
    dispatch(clear_user())
  }, [])
  useEffect(() => {
    if (dataUser) {
      reset({
        favourites: dataUser.favourites,
        isGraduate: dataUser.isGraduate,
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        school: dataUser.school,
        email: dataUser.email,
        phone: dataUser.phone,
        address: dataUser.address,
        gender: dataUser.gender,
        dateOfBirth: moment(moment(new Date(dataUser.dateOfBirth)).format('DD/MM/YYYY'), 'DD/MM/YYYY')
      })
    }
    else {
      setIsLoading(true)
    }
  }, [dataUser])
  useEffect(() => {
    if (isObjectEqual(watch(), dataUser)) {
      setOpenDisabled(false)
    }
    else if (isValid === false) {
      setOpenDisabled(false)
    }
    else {
      setOpenDisabled(true)
    }
  }, [watch()])
  const showModalDel = () => {
    setOpenModalDel(true);
  };
  const showModalUpdate = () => {
    setOpenModalUpdate(true);
  };
  const handleOkDel = async () => {
    setConfirmLoading(true);
    await deleteUser(`/users/${userId}`)
    timeOut(setOpenModalUpdate,openNotification ,'Xóa User thành công!!!',navigate)
  };
  const handleCancelDel = () => {
    setOpenModalDel(false);
  };
  const handleOkError = () => {
    navigate('/home')
  }
  const handleOkUpdate = async () => {
    setConfirmLoading(true);
    await patchUser(`/users/${userId}`, dataUpdate.current)
    timeOut(setOpenModalUpdate,openNotification ,'Update User thành công!!!',navigate)
  };
  const handleCancelUpdate = () => {
    setOpenModalUpdate(false);
  };
  const onSubmit = (data) => {
    data.dateOfBirth = Date.parse(data.dateOfBirth)
    dataUpdate.current = data
  }
  return (
    <form className='form-detail' onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      {isLoading ? stopLoading ?
        <Modal title="Confirm" open={true} confirmLoading={confirmLoading}
          footer={[
            <Button key="submit" type="primary" onClick={handleOkError}>
              Ok
            </Button>
          ]}>
          <p>Có lỗi, vui lòng thử lại!!!</p>
        </Modal> : <Spin /> :
        <>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>First Name</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input {...field} status={errors.firstName ? "error" : ""} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.firstName && <p>{errors.firstName.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Last Name</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input {...field} status={errors.lastName ? "error" : ""} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.lastName && <p>{errors.lastName.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Email</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} status={errors.email ? "error" : ""} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.email && <p>{errors.email.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Gender</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => <Select {...field} status={errors.gender ? "error" : ""}
                  options={optionsGender}
                />}
              />
            </Col>
            <Col className='errors-validate'>{errors.gender && <p>{errors.gender.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Phone</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} status={errors.phone ? "error" : ""} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.phone && <p>{errors.phone.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Address</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="address"
                control={control}
                render={({ field }) => <Input {...field} status={errors.address ? "error" : ""} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.address && <p>{errors.address.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Date of birth</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => <DatePicker format={dateFormat} {...field} status={errors.dateOfBirth ? "error" : ""} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Is Graduate</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="isGraduate"
                control={control}
                render={({ field }) => <Checkbox checked={watch('isGraduate')} onChange={() => setValue("isGraduate")} {...field} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.isGraduate && <p>{errors.isGraduate.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>Favourites</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="favourites"
                control={control}
                render={({ field }) => <Checkbox.Group options={options} {...field} />}
              />
            </Col>
            <Col className='errors-validate'>{errors.favourites && <p>{errors.favourites.message}</p>}</Col>
          </Row>
          <Row className='row'>
            <Col span={2} className='input-label'>
              <label>School</label>
            </Col>
            <Col span={8} className='input-value'>
              <Controller
                name="school"
                control={control}
                render={({ field }) => <Select {...field} status={errors.school ? "error" : ""}
                  options={optionsSchool}
                />}
              />
            </Col>
            <Col className='errors-validate'>{errors.school && <p>{errors.school.message}</p>}</Col>
          </Row>
          <Row className='button-actions'>
            <Col span={2} />
            <Col span={8}>{
            }
              <Button type='primary' htmlType='submit' onClick={showModalUpdate} disabled={!openDisabled}>Update</Button>
              <Button type='primary' htmlType='button' onClick={showModalDel}>Delete</Button>
              <Modal title="Confirm" open={openModalDel} onOk={handleOkDel} onCancel={handleCancelDel} confirmLoading={confirmLoading}>
                <p>Bạn có chắc chắn muốn xóa?</p>
              </Modal>
              <Modal title="Confirm" open={openModalUpdate} onOk={handleOkUpdate} onCancel={handleCancelUpdate} confirmLoading={confirmLoading}>
                <p>Bạn có chắc chắn muốn update?</p>
              </Modal>
            </Col>
          </Row>
        </>
      }
    </form>
  )
}