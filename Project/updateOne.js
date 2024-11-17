import React, { useEffect, useState } from 'react';
import { Checkbox, Button, Form, Row, Col, Modal, Collapse, Input, Table, Select, Space } from 'antd';

const TrainingCategoryAssociation = ({ isEdited, setIsEdited, form, fetchData, setClearState, trainingDetails, testCategory, trainingAssociation, questionBankList, questionbankSelectionHandler, quesCount, setQuestion, selectionType, setSelectionCriteria }) => {
    const [modalTitle, setModalTitle] = useState('');
    const [trainingAddedList, setTrainingAssociation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [addEdit, setAddEdit] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [checkedRows, setCheckedRows] = useState({});
    const [rowData, setRowData] = useState({});
    const [index, setIndex] = useState(null);
    const [modl] = Form.useForm();

    const [totalQuestions, setTotalQuestions] = useState(0); /// code added
    const [selectedQuestionKeys, setSelectedQuestionKeys] = useState([]); // Store selected question IDs

    
    
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [editRecord, setEditRecord] = useState(null);
    useEffect(() => {
        if (setClearState) setClearState(() => handleClearState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setClearState]);






    const handleClearState = () => {
        setModalVisible(false);
        setModalTitle('');
        setIsEdited(false);
    };

    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleViewConfiguration = (data, index) => {
        const { testCategory } = data;
        const editRecord = trainingAddedList.filter((item) => item.testCategory == testCategory);
        // console.log("trainingAddedList",trainingAddedList)
        setModalTitle(`View ${testCategory} Configuration`);
        setEditRecord(editRecord);
        setModalVisible(true);
    };

    

    const handleCancel = () => {
        setIsEdited(false);
        form.resetFields();
    };

    const cleanUpRowData = (rowData) => {
        return Object.keys(rowData).reduce((cleanedData, index) => {
            const { test, testCategoryVal, certificate, nomination, ...rest } = rowData[index];
            cleanedData[index] = rest; // Keep only the relevant data
            return cleanedData;
        }, {});
    };



    // const questionDetails = [
    //     { questionId: '1234', questionDescription: 'How are you?' },
    //     { questionId: '123', questionDescription: 'How are you!?' },
    //     { questionId: '23', questionDescription: 'How are you!!?' },
    // ];



    const questionDetails = questionBankList
        ? questionBankList.map((item) => ({
              questionId: item.id,
              questionDescription: item.questionBankName,
          }))
        : [{ questionId: '1234', questionDescription: 'How are you?' }];

        
    const getRandomValues = (arr, numElements) => {
        const result = [];
        const usedIndices = new Set();

        while (result.length < numElements) {
            const randomIndex = Math.floor(Math.random() * arr.length);

            if (!usedIndices.has(randomIndex)) {
                result.push({ questionId: arr[randomIndex].questionId });
                usedIndices.add(randomIndex);
            }
        }

        return result;
    };

    useEffect(() => {
        if (selectionType === 'Random') {
            const randomQuestionIds = getRandomValues(questionDetails, quesCount);
            setSelectedRecords(randomQuestionIds);
        }
    }, [selectionType]);

    // Function to create trainingCategoryAssociation based on rowData
    const createTrainingCategoryAssociation = (rowData) => {
        return Object.keys(rowData).map((index) => {
            const row = rowData[index];
            return {
                testCategoryId: row.testCategory || '',
                preRequisiteForNomination: row.preRequisiteForNomination || 0,
                preRequisiteForTest: row.preRequisiteForTest || 0,
                preRequisiteForCertification: row.preRequisiteForCertification || 0,
                questionBankId: row.questionBank || '',
                totalQuestions: parseInt(row.totalQuestions, 10) || 0,
                selectionCriteria: row.selectionCriteria || '',
                questionList: selectedRecords,
                testDetailsDto: {
                    totalMarks: parseInt(row.testDetails.totalMarks, 10) || 0,
                    cutOffPercent: parseInt(row.testDetails.cutOffPercent, 10) || 0,
                    validTill: parseInt(row.testDetails.validTill, 10) || 0,
                    maximumAttempts: parseInt(row.testDetails.maximumAttempt, 10) || 0,
                    duration: parseInt(row.testDetails.duration, 10) || 0,
                },
            };
        });
    };

    // Handler function to add questions and process rowData
    const addQuestionsHandler = (index) => {
        modl.validateFields()
            .then((values) => {
                const { attempt, cutOffPercent, duration, questionBank, selectionCriteria, totalMarks, totalQuestions, validTill } = values;
                console.log('selectionCriteria', selectionCriteria);
                const testDetails = {
                    testDetails: {
                        totalMarks,
                        cutOffPercent,
                        validTill,
                        maximumAttempt: attempt,
                        duration,
                    },
                    questionBank,
                    selectionCriteria,
                    totalQuestions,
                };
                console.log('rowData[index]', rowData[index], 'values', values);

                if (rowData[index]) {
                    const { testCategoryVal = '', test = false, nomination = false, certificate = false } = rowData[index];

                    const testCategory = testCategoryVal || rowData[index].testCategory || '';
                    const preRequisiteForTest = test ? 1 : 0;
                    const preRequisiteForNomination = nomination ? 1 : 0;
                    const preRequisiteForCertification = certificate ? 1 : 0;

                    rowData[index] = {
                        ...rowData[index],
                        preRequisiteForTest,
                        preRequisiteForNomination,
                        preRequisiteForCertification,
                        testCategory,
                        ...testDetails,
                    };
                }

                const cleanedRowData = cleanUpRowData(rowData);
                const trainingCategoryAssociation = createTrainingCategoryAssociation(cleanedRowData);
                setTrainingAssociation(trainingCategoryAssociation);
                trainingAssociation(trainingCategoryAssociation);
                modl.resetFields();
                setModalVisible(false);
            })
            .catch((errorInfo) => {
                console.error('Validation Failed:', errorInfo);
            });
    };

    // Initial values for the form fields
    // const initialValues = {
    //     preTest: false,
    //     preTestNomination: false,
    //     preTestPreRequisite: false,
    //     preTestCertification: false,
    //     postTest: false,
    //     postTestNomination: false,
    //     postTestPreRequisite: false,
    //     postTestCertification: false,
    // };


    const HandleFooter = () => (
        <Row justify={'end'}>
            <Col>
                <Button style={{ marginRight: 15, fontWeight: 'bold' }} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button type="primary" htmlType="submit" style={{ fontWeight: 'bold' }} onClick={() => addQuestionsHandler(index)}>
                    Add
                </Button>
            </Col>
        </Row>
    );

    // const fieldsValue = trainingDetails.getFieldsValue();

    // const questionDetails = Object.keys(fieldsValue).reduce((acc, key) => {
    //     if (key.startsWith('Date-')) {
    //         const index = key.split('-')[1];
    //         acc.push({
    //             questionID: fieldsValue[key],
    //             questionDescription: fieldsValue[`Topic-${index}`] || 'No description available',
    //         });
    //     }
    //     return acc;
    // }, []);
    const handleCheckboxChange = (record) => {
        setSelectedRecords((prevSelected) => {
            const isSelected = prevSelected.some((item) => parseInt(item.questionId) === parseInt(record.questionId));
            if (isSelected) {
                return prevSelected.filter((item) => parseInt(item.questionId) !== parseInt(record.questionId));
            } else {
                return [...prevSelected, { questionId: parseInt(record.questionId) }];
            }
        });
    };





/////////////////////////////////addded code////////////////////////////////


    // const TableDetials = ({ totalQuestions }) => (
    //     <Table
    //         dataSource={questionDetails.slice(0, totalQuestions)} // Slice dataSource based on totalQuestions
    //         columns={[
    //             {
    //                 title: 'Question ID',
    //                 dataIndex: 'questionId',
    //                 key: 'questionID',
    //                 width: '20%',
    //                 sorter: false,
    //                 ellipsis: true,
    //             },
    //             {
    //                 title: 'Question Description',
    //                 dataIndex: 'questionDescription',
    //                 key: 'questionDescription',
    //                 width: selectionType === 'Custom' ? '70%' : '80%',
    //                 sorter: false,
    //                 ellipsis: true,
    //             },
    //             ...(selectionType === 'Custom '
    //                 ? [
    //                       {
    //                           title: 'Action',
    //                           dataIndex: 'action',
    //                           key: 'action',
    //                           width: '10%',
    //                           sorter: false,
    //                           ellipsis: true,
    //                           render: (_, record) => (
    //                               <Space size="middle">
    //                                   <Checkbox
    //                                       checked={selectedRecords.some(
    //                                           (item) => parseInt(item.questionId) === parseInt(record.questionId)
    //                                       )}
    //                                       onChange={() => handleCheckboxChange(record)}
    //                                   />
    //                               </Space>
    //                           ),
    //                       },
    //                   ]
    //                 : []),
    //         ]}
    //     />
    // );



    const TableDetials = ({ selectedQuestionKeys }) => (
        <Table
            dataSource={questionDetails.filter((question) => selectedQuestionKeys.includes(String(question.questionId)))} // Filter by selected keys
            columns={[
                {
                    title: 'Question ID',
                    dataIndex: 'questionId',
                    key: 'questionID',
                    width: '20%',
                    sorter: false,
                    ellipsis: true,
                },
                {
                    title: 'Question Description',
                    dataIndex: 'questionDescription',
                    key: 'questionDescription',
                    width: selectionType === 'Custom' ? '70%' : '80%',
                    sorter: false,
                    ellipsis: true,
                },
                ...(selectionType === 'Custom'
                    ? [
                          {
                              title: 'Action',
                              dataIndex: 'action',
                              key: 'action',
                              width: '10%',
                              sorter: false,
                              ellipsis: true,
                              render: (_, record) => (
                                  <Space size="middle">
                                      <Checkbox
                                          checked={selectedRecords.some(
                                              (item) => parseInt(item.questionId) === parseInt(record.questionId)
                                          )}
                                          onChange={() => handleCheckboxChange(record)}
                                      />
                                  </Space>
                              ),
                          },
                      ]
                    : []),
            ]}
        />
    );
    
    






    // const TableDetials = () => (
    //     <Table
    //         dataSource={questionDetails}
    //         columns={[
    //             {
    //                 title: 'Question ID',
    //                 dataIndex: 'questionId',
    //                 key: 'questionID',
    //                 width: '20%',
    //                 sorter: false,
    //                 ellipsis: true,
    //             },
    //             {
    //                 title: 'Question Description',
    //                 dataIndex: 'questionDescription',
    //                 key: 'questionDescription',
    //                 width: selectionType === 'Custom' ? '70%' : '80%',
    //                 sorter: false,
    //                 ellipsis: true,
    //             },
    //             ...(selectionType === 'Custom '
    //                 ? [
    //                       {
    //                           title: 'Action',
    //                           dataIndex: 'action',
    //                           key: 'action',
    //                           width: '10%',
    //                           sorter: false,
    //                           ellipsis: true,
    //                           render: (_, record, index) => [
    //                               <Space size="middle">
    //                                   <Checkbox checked={selectedRecords.some((item) => parseInt(item.questionId) === parseInt(record.questionId))} onChange={() => handleCheckboxChange(record)} />
    //                               </Space>,
    //                           ],
    //                       },
    //                   ]
    //                 : []),
    //         ]}
    //     />
    // );


    const testOption = [
        { value: 1, label: 'Demo Question Bank' },
        { value: 2, label: 'Question Bank 2' },
    ];
    const selectionCriteria = [
        { value: 'Random', label: 'Random Selection' },
        { value: 'Custom', label: 'Custom Selection' },
    ];
    const handleCollapseChange = (key) => {
        setIsExpanded(key.length > 0); // If key has length, it means it's expanded
    };

    const handleTestCategory = (index, e, val) => {
        setCheckedRows((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // toggle the checked state for the row
        }));
        setRowData((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], testCategory: e.target.checked, testCategoryVal: val },
        }));
    };
    const handleNomination = (index, e) => {
        setRowData((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], nomination: e.target.checked },
        }));
    };

    const handleTest = (index, e) => {
        setRowData((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], test: e.target.checked },
        }));
    };

    const handleCertificate = (index, e) => {
        setRowData((prevState) => ({
            ...prevState,
            [index]: { ...prevState[index], certificate: e.target.checked },
        }));
    };

    // Handle Add button click, passing the specific row's data
    const handleAddConfiguration = (data, index) => {
        const { testCategory } = data;
        setModalTitle(`Add ${testCategory} Configuration`);
        setModalVisible(true);
        setIndex(index);
        setEditRecord(null);
    };
    const handleSelectionCriteria = (val) => {
        setSelectionCriteria(val);
    };
    return (
        <div style={{ margin: '10px 0 20px' }}>
            <hr style={{ border: '1px solid #E6E6E6', width: '100%' }} />
            <Form form={form} onFinish={onFinish} layout="vertical" name="TrainingCategoryAssociation" autoComplete="off">
                <Row gutter={16} style={{ fontWeight: 'bold', border: '1px solid #E6E6E6', borderTopLeftRadius: '5px', borderTopRightRadius: '5px', padding: '15px 0px', margin: '0' }}>
                    <Col span={4}>Test Category</Col>
                    <Col span={5}>Pre-Requisite for Nomination</Col>
                    <Col span={5}>Pre-Requisite for Test</Col>
                    <Col span={5}>Pre-Requisite for Certification</Col>
                    <Col span={5}>Test Configuration</Col>
                </Row>

                {testCategory.map((item, index) => (
                    <Row key={index} gutter={16} style={{ alignItems: 'center', border: '1px solid #E6E6E6', padding: '10px 0px', background: '#fff', margin: '0' }}>
                        <Col span={4}>
                            <Form.Item name={`preTest-${index}`} valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Checkbox
                                    onChange={(e) => handleTestCategory(index, e, item?.testCategoryId)}
                                    checked={!!checkedRows[index]} // check if the row is checked
                                >
                                    {item?.testCategory}
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={`nomination-${item.testCategoryId}`} valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Checkbox onChange={(e) => handleNomination(index, e)} disabled={!checkedRows[index]} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={`test-${item.testCategoryId}`} valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Checkbox onChange={(e) => handleTest(index, e)} disabled={!checkedRows[index]} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={`certificate-${item.testCategoryId}`} valuePropName="checked" style={{ marginBottom: 0 }}>
                                <Checkbox onChange={(e) => handleCertificate(index, e)} disabled={!checkedRows[index]} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            {trainingAddedList && trainingAddedList.some((ta) => ta.testCategory === item.testCategory) ? (
                                <Button style={{ border: 'none' }} onClick={() => handleViewConfiguration(item, index)}>
                                    View
                                </Button>
                            ) : (
                                <Button type="link" disabled={!checkedRows[index]} onClick={() => handleAddConfiguration(item, index)}>
                                    Add
                                </Button>
                            )}
                        </Col>
                    </Row>
                ))}
            </Form>
            <Modal title={modalTitle} open={modalVisible} onCancel={handleCloseModal} width={884} height={392} footer={!editRecord ? <HandleFooter /> : null} bodyStyle={{ maxHeight: 504, overflow: 'auto' }}>
                <Form layout="vertical" form={modl}>
                    <Row gutter={16} style={{ margin: 0 }}>
                        <Col span={8}>
                            <Form.Item name="questionBank" label="Question Bank">
                                {!editRecord ? (
                                    <Select
                                        placeholder="Select"
                                        options={
                                            questionBankList
                                                ? questionBankList.map((item) => ({
                                                      value: item.id,
                                                      label: item.questionBankName,
                                                  }))
                                                : []
                                        }
                                        onChange={questionbankSelectionHandler}
                                    />
                                ) : (
                                    <p>{editRecord[0].questionBank}</p>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>



                        {/* <Form.Item
    name="totalQuestions"
    label="Total Questions in Test"
    rules={[
        {
            required: true,
            message: 'Please input a number!',
        },
        {
            pattern: /^\d+$/, // Regex to allow only numbers
            message: 'Only numbers are allowed!',
        },
        {
            validator: (_, value) => {
                if (!value || parseInt(value, 10) <= questionDetails.length) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(`Number should not be more than ${questionDetails.length}`));
            },
        },
    ]}
>
    {!editRecord ? (
        <Input
            onChange={(e) => {
                const value = parseInt(e.target.value, 10) || 0;
                setTotalQuestions(value); // Update state here
                setQuestion(value); // existing function
            }}
            placeholder="Enter No."
            defaultValue={0}
        />
    ) : (
        <p>{editRecord[0].totalQuestions}</p>
    )}
</Form.Item> */}



<Form.Item
    name="totalQuestions"
    label="Total Questions in Test"
    rules={[
        {
            required: true,
            message: 'Please input a number!',
        },
        {
            pattern: /^\d+$/, // Regex to allow only numbers
            message: 'Only numbers are allowed!',
        },
        {
            validator: (_, value) => {
                if (!value || parseInt(value, 10) <= questionDetails.length) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(`Number should not be more than ${questionDetails.length}`));
            },
        },
    ]}
>
    {!editRecord ? (
        <Input
            onChange={(e) => {
                const inputVal = e.target.value.split(',').map((id) => id.trim()); // Convert input to array of keys
                setSelectedQuestionKeys(inputVal); // Update state with the list of keys
                setQuestion(inputVal); // Keep your existing setQuestion handler
                console.log('inputVal', inputVal);
            }}
            placeholder="Enter IDs, separated by commas (e.g., 1,2,3)"
            defaultValue=""
        />
    ) : (
        <p>{editRecord[0].totalQuestions}</p>
    )}
</Form.Item>






                            {/* <Form.Item
                                name="totalQuestions"
                                label="Total Questions in Test"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input a number!',
                                    },
                                    {
                                        pattern: /^\d+$/, // Regex to allow only numbers
                                        message: 'Only numbers are allowed!',
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!value || parseInt(value, 10) <= questionDetails.length) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(`Number should not be more than ${questionDetails.length}`));
                                        },
                                    },
                                ]}
                            >
                                {!editRecord ? (
                                    <Input
                                        onChange={(e) => {
                                            setQuestion(e.target.value);
                                        }}
                                        placeholder="Enter No."
                                        defaultValue={0}
                                    />
                                ) : (
                                    <p>{editRecord[0].totalQuestions}</p>
                                )}
                            </Form.Item> */}



                        </Col>



                        <Col span={8}>
                            <Form.Item name="selectionCriteria" label="Selection Criteria">
                                {!editRecord ? <Select placeholder="Select" options={selectionCriteria} onChange={handleSelectionCriteria} /> : <p>{editRecord[0].selectionCriteria}</p>}
                            </Form.Item>
                        </Col>
                        <Col span={24}>


{/* <Col>

<Form.Item name="slectionCriteria" label="Selection Criteria">
    {!editRecord ? <Select placeholder="Select" option={selectionCriteria} onChange={handleSelectionCriteria}/> : <p>{editRecord[0].selectionCriteria}</p>}
</Form.Item>

</Col> */}



{/* 


                            <Collapse
                                items={[
                                    {
                                        key: '1',
                                        label: `Total Selected Questions in Test: ${selectedRecords.length} out of ${questionDetails.length}`,
                                        children: <TableDetials />,
                                    },
                                ]}
                                onChange={handleCollapseChange}
                                expandIconPosition="end"
                                expandIcon={() => <span style={{ color: '#FF3E5B', fontSize: '14px', fontWeight: '700' }}>{isExpanded ? 'Hide Questions' : 'View Questions'}</span>}
                            /> */}



<Collapse
    items={[
        {
            key: '1',
            label: `Total Selected Questions in Test: ${selectedRecords.length} out of ${questionDetails.length}`,
            children: <TableDetials selectedQuestionKeys={selectedQuestionKeys} />, // Pass selectedQuestionKeys as prop
        },
    ]}
    onChange={handleCollapseChange}
    expandIconPosition="end"
    expandIcon={() => (
        <span style={{ color: '#FF3E5B', fontSize: '14px', fontWeight: '700' }}>
            {isExpanded ? 'Hide Questions' : 'View Questions'}
        </span>
    )}
/>

{/* 
<Collapse
    items={[
        {
            key:1,
            label: `Total Selected Questions in Test: ${selectedRecords.length} out of ${questionDetails.length}`,
            children:<TableDetails selectedQuestionKeys={selectedQuestionKey} /> // pass selectedQuestions as prop
        },
    ]}

    onChange={handleCollapseChange}
    expandIconPosition="end"
    expandIcon={() => (
        <span style= {{color: '#FF3E5B', fontSize: '14px', fontWeight: '700'}}>
            {isExpanded ? 'Hide Question' : 'View Question'}
        </span>
    )}

    /> */}







{/* <Collapse
    items={[
        {
            key: '1',
            label: `Total Selected Questions in Test: ${selectedRecords.length} out of ${questionDetails.length}`,
            children: <TableDetials totalQuestions={totalQuestions} />, // Pass as prop here
        },
    ]}
    onChange={handleCollapseChange}
    expandIconPosition="end"
    expandIcon={() => (
        <span style={{ color: '#FF3E5B', fontSize: '14px', fontWeight: '700' }}>
            {isExpanded ? 'Hide Questions' : 'View Questions'}
        </span>
    )}
/> */}





                        </Col>
                        <Col span={24}>
                            <h3>Test Details</h3>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="totalMarks" label="Total Marks">
                                {!editRecord ? <Input placeholder="Enter No." /> : <p>{editRecord[0].testDetails.totalMarks}</p>}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="cutOffPercent" label="Cut Off Percentage (%)">
                                {!editRecord ? <Input placeholder="Enter No." /> : <p>{editRecord[0].testDetails.cutOffPercentage}</p>}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="validTill" label="Valid Till (In Days)">
                                {!editRecord ? <Input placeholder="Enter No." /> : <p>{editRecord[0].testDetails.validTill}</p>}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="attempt" label="Maximum Attempt">
                                {!editRecord ? <Input placeholder="Enter No." /> : <p>{editRecord[0].testDetails.maximumAttempt}</p>}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="duration" label="Duration (In Minutes)">
                                {!editRecord ? <Input placeholder="Enter No." /> : <p>{editRecord[0].testDetails.duration}</p>}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default TrainingCategoryAssociation;
