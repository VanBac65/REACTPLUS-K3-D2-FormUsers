import React, { useRef, useState } from 'react'
import { Button, Checkbox, Col, DatePicker, Input, Modal, notification, Row, Select } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form'
import { schema } from '../../Utils/Schema';
import { optionsGender } from '../../Utils/OptionsGender';
import { options } from '../../Utils/OptionsFavourites';
import { optionsSchool } from '../../Utils/OptionsSchool';
import { postUser } from '../../Services/PostUser'
import './CreateUser.css'

export default function CreateUser() {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { control, handleSubmit, setValue, watch, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      favourites: [],
      isGraduate: false,
    }
  })
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, des) => {
    api.info({
      message: `Notification`,
      description: des,
      placement,
    });
  };
  const dataCreate = useRef({})
  const handleOkCreate = async () => {
    setConfirmLoading(true);
    await postUser("/users", dataCreate.current)
    setTimeout(async () => {
      setOpenModalCreate(false);
      openNotification('topRight', 'Thêm mới User thành công!!!')
      setConfirmLoading(false)
    }, 1000);
  };
  const handleCancelCreate = () => {
    setOpenModalCreate(false);
  };
  const onSubmitData = async (data) => {
    data.dateOfBirth = Date.parse(data.dateOfBirth)
    dataCreate.current = data
    reset({})
  }
  return (
    < form className='form-create' onSubmit={handleSubmit(onSubmitData)} >
      <Row className='row'>
        {contextHolder}
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
            render={({ field }) => <DatePicker {...field} format='DD/MM/YYYY' status={errors.dateOfBirth ? "error" : ""} />}
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
            render={({ field }) => <Checkbox checked={watch('isGraduate')} onChange={() => setValue("isGraduate", !watch('isGraduate'))} {...field} />}
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
        <Col span={10}>
          <Button type='primary' htmlType='submit' onClick={() => setOpenModalCreate(true)} disabled={!isValid}>Submit</Button>
        </Col>
        <Modal title="Confirm" open={openModalCreate} onOk={() => handleOkCreate()} onCancel={handleCancelCreate} confirmLoading={confirmLoading}>
          <p>Bạn có chắc chắn muốn Create?</p>
        </Modal>
      </Row>
    </form >
  )
}