import OSS from 'ali-oss';
import React from 'react';
import { Upload, Icon, Spin,Button } from 'antd';
import DelIcon from './Icon/DelIcon';
import styles from './index.css';

class PicUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            changeShow: false,
            fileName: '',
            fileUrl: '',
        }
    }
    delClick = ()=>{
        this.setState({changeShow: false, show: false})
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const fileList = [];
        const client = self => {
            return new OSS({
                region: 'oss-cn-beijing',
                accessKeyId: 'LTAI4G9Z5w4dSo4LTWJTnsNX',
                accessKeySecret: 'jowuUUURmisYjdn3ZFKelQZtpCatXj',
                bucket: 'image-bucket-6',
            });
        };

        const uploadPath = (path, file) => {
            return `${path}/${file.name.split('.')[0]}-${file.uid}.${file.type.split('/')[1]}`;
        };

        const UploadToOss = (self, path, file) => {
            const url = uploadPath(path, file);
            const headers = {
                "Content-Type": "image/jpg"
            };
            return new Promise((resolve, reject) => {
                client(self)
                    .multipartUpload(url, file, { headers })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        const beforeUpload = file => {
            this.setState({ show: true })
            const floder = 'images';
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                UploadToOss(this, floder, file)
                    .then(data => {
                        this.setState({ show: true })
                        return data;
                    })
                    .then(data => {
                        this.setState({ show: false, changeShow: true, fileName: file.name, fileUrl: data.res.requestUrls[0]});
                        this.props.imageHandleChange(data.res.requestUrls[0]);
                    });
            };
            return false;
        };
        const uploadProps = {
            beforeUpload: beforeUpload,
            fileList: fileList,
            accept: 'image/*',
            listType: 'picture-card',
        };
        return (<div>
            {(this.state.changeShow===false && this.state.show) && <Spin style={{ position: 'relative', left: '40px' }} />}
            {(this.state.changeShow===false && this.state.show===false) && <Upload {...uploadProps}>{uploadButton}</Upload>}
            {this.state.changeShow && (<div><a href={this.state.fileUrl}>{this.state.fileName}<Icon style={{marginLeft:20}} type="paper-clip" /></a><Button onClick={this.delClick} className={styles.del_icon}><DelIcon></DelIcon></Button></div>)}  
        </div>)
    }
}

export default PicUploader;