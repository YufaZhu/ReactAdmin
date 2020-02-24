import React, { Component } from 'react';
import {Button,Card,Icon,Table,message} from 'antd';
import LinkButton from './../../components/link-button'
import {reqCategorys} from './../../api'

class Category extends Component {
    
    state={
        categorys:[],       //一级分类列表
        loading:false,
        parentId:'0',       //当前需要显示的分类列表的父分类ID
        parentName:'',      //当前需要显示的分类列表的父分类名称
        subCategorys:[],    //二级分类列表
    }
    
    initColumns=()=>{
        this.columns = [
            {
              title: '分类的名称',
              dataIndex: 'name',
            },
            {
              title: '操作',
              width:"300px",
              render:(category)=>(
                  <span>
                      <LinkButton>修改分类</LinkButton>
                      {/* 如何向事件回调函数传递参数，先定义一个匿名箭头函数，在通过匿名函数调用处理的函数传入参数 */}
                      {/* 查看子分类只有在一级列表才会显示，二级列表就没有了，所以可以用三目运算 */}
                      {this.state.parentId==='0' ? <LinkButton onClick={()=>this.showSubCategorys(category)}>查看子分类</LinkButton>:null}
                  </span>
              )
            }
          ];
    }
    //显示一级/二级列表数据
    getCategorys=async()=>{
        //请求数据前显示loading
        this.setState({loading:true})
        const {parentId} = this.state
        const result = await reqCategorys(parentId);
        //请求数据后不显示loading
        this.setState({loading:false})
        if(result.status===0){
            const categorys = result.data;
            if(parentId==='0'){
                this.setState({categorys:categorys})
            }else{
                this.setState({subCategorys:categorys})
            }
            
        }else{
            message.error('获取列表失败')
        }

    }
    //显示指定的一级列表的二级列表数据
    showSubCategorys=(category)=>{
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{//在状态更新且重新render后执行，因为setState是异步更新数据的
            this.getCategorys()
        })
    }

    showCategorys=()=>{
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }

    componentWillMount(){
        this.initColumns()
    }
    
    componentDidMount(){
        this.getCategorys()
    }

    render() { 
        const {categorys,subCategorys,parentId,loading,parentName} = this.state
        const title = parentId==='0' ? '一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight:5}}/>
                <span>{parentName}</span>
            </span>
        );
        const extra = (
        <Button type="primary">
            <Icon type='plus'></Icon>
            添加
        </Button>
        );

        return ( 
            <Card title={title} extra={extra}>
                <Table 
                dataSource={parentId==='0'?categorys:subCategorys} 
                columns={this.columns} 
                bordered
                rowKey='_id'
                pagination={{defaultPageSize:5,showQuickJumper:true}}
                loading={loading}
                />;
            </Card>
         );
    }
}
 
export default Category;
