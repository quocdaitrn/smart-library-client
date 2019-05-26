// import React, { Component } from 'react';
// import {
//     Form, Button, Icon, Rate, Input, notification
// } from 'antd';
// import { makeLoan } from '../../util/APIUtils';

// const FormItem = Form.Item;
// const TextArea = Input.TextArea;

// const openNotificationWithIcon = (type, description) => {
//     notification[type]({
//       message: 'SmartLib',
//       description: description,
//     });
// };

// class BorrowForm extends Component {
//     constructor(props){
//         super(props);
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();

//         var today = new Date();
//         var dd = String(today.getDate()).padStart(2, '0');
//         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//         var yyyy = today.getFullYear();
//         today = yyyy + '-' + mm + '-' + dd;

//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 const formData = new FormData();
//                 for(var key in values){
//                     formData.append(key, values[key]);
//                 }
//                 formData.append('userId', this.props.user.id);
//                 formData.append('libItemId', this.props.item.id);
//                 formData.append('borrowDate', today);
//                 makeLoan(loanRequest)
//                 .then(res=>{
//                     console.log(res);
//                     if(res.data.result){
//                         openNotificationWithIcon('success', 'Đăng bài thành công');
//                         this.props.obj.hidePostForm();
//                         this.props.obj.postlist.current.loadData();
//                     }
//                     else{
//                         openNotificationWithIcon('error','Đã có lỗi xảy ra');
//                     }
//                 }).catch(err=>{
//                     openNotificationWithIcon('error','Đã có lỗi xảy ra');
//                 })

//             }
//         });
//         return false;
//     }
  
//     normFile = (e) => {
//       console.log('Upload event:', e);
//       if (Array.isArray(e)) {
//         return e;
//       }
//       return e && e.fileList;
//     }
  
//     render() {
//         var formLayout = 'vertical'
//         const formItemLayout = formLayout === 'horizontal' ? {
//           labelCol: { span: 4 },
//           wrapperCol: { span: 14 },
//         } : null;
//         const buttonItemLayout = formLayout === 'horizontal' ? {
//           wrapperCol: { span: 14, offset: 4 },
//         } : null;
//         const { getFieldDecorator } = this.props.form;
//         console.log(getFieldDecorator);
//         return (
//           <div>
//             <Form layout={formLayout} onSubmit={this.handleSubmit}>
//               <FormItem
//                 label="Tiêu đề"
//                 {...formItemLayout}
//               >
//                {getFieldDecorator('blog_title', {
//                     rules: [{ required: true, message: 'Vui lòng nhập tiêu đề' }],
//                 })(
//                     <Input placeholder="Tiêu đề" />
//                 )}
//               </FormItem>
//               <FormItem
//                 label="Nội dung"
//                 {...formItemLayout}
//               >
//               {getFieldDecorator('detail', {
//                     rules: [{ required: true, message: 'Vui lòng nhập nội dung' }],
//                 })(
//                     <TextArea rows={5} placeholder="Cảm nghĩ của bạn về nơi này" />
//                 )}
//               </FormItem>
//               <FormItem
//                 {...formItemLayout}
//                 label="Đánh giá"
//                 >
//                 {getFieldDecorator('rating', {
//                     initialValue: 3.5,
//                 })(
//                     <Rate />
//                 )}
//                 </FormItem>
//                 <Form>
//                     <UploadPhoto ref={this.uploader} action={'//jsonplaceholder.typicode.com/posts/'}></UploadPhoto>
//                 </Form>
//               <FormItem style={{marginTop:'20px'}} {...buttonItemLayout}>
//                 <Button type="primary"  htmlType="submit"><Icon type="form" /> Đăng bài</Button>
//               </FormItem>
//             </Form>
//           </div>
//         );
//       }
//   }
  
//   export default Form.create()(PostForm);