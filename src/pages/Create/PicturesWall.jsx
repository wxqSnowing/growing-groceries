
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { connect } from 'dva';
import { Upload, Icon, Modal, message } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
        ],
    };

    handleCancel = () => {
        this.setState({ previewVisible: false })
    };

    handlePreview = async (file) => {
        console.log(file.url, 'url--------');
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList }, () => {
            console.log(this.state.fileList);
        }
        )
    };

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('请上传图片.jpg .jpeg, .png格式');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片应该小于2M');
        }
        return isJpgOrPng && isLt2M;
    }

    customRequest = (detail) => {
        console.log(this.state.fileList, '-------', detail);
        // this.props.dispatch({
        //     type: 'workModel/uploadWorkImage',
        //     payload: {
        //         imagePath: this.state.imagePath,
        //     }
        // })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    accept="image/*"
                    customRequest={this.customRequest}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={this.beforeUpload}
                    style={{ width: 100, height: 100 }}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default connect(({ workModel }) => ({
    uploadWorkImageResult: workModel.uploadWorkImageResult,
}), null, null, { forwardRef: true })(PicturesWall);