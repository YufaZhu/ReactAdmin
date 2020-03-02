import React, { Component } from 'react';
import {Card,Table,Select,Input,Button,Icon} from 'antd'
import LinkButton from './../../components/link-button'
import { reqProducts, reqSearchProducts } from './../../api'
import {PAGE_SIZE} from './../../utils/constants'

const Option = Select.Option

class ProductHome extends Component {
    
    state={
        products:[],
        total:0,
        searchType:'productName', // 搜索类型 productName / productDesc
        searchName:'',  // 搜索关键字
    }

    initColumns=()=>{
        this.columns= [
            {
              title: '商品名称',
              dataIndex: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price)=>'￥'+price
            },
            {
              width:100,
              title: '状态',
              dataIndex: 'status',
              render:(status)=>{
                  return(
                      <span>
                        <Button type='primary'>下架</Button>
                        <span>在售</span>
                      </span>
                  )
              }
            },
            {
                title: '操作',
                dataIndex: 'status',
                render:(product)=>{
                    return(
                        <span>
                          <LinkButton>详情</LinkButton>
                          <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
              },
          ];
          
    }

    getProducts=async(pageNum)=>{
        const {searchType,searchName} = this.state
        let result;
        if(searchName){
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchType,searchName})
        }else{
            result = await reqProducts(pageNum,PAGE_SIZE)
        }
        if(result.status===0){
            const{total,list} = result.data
            this.setState({
                total:total,
                products:list
            })
        }
    
    }

    componentWillMount(){
        this.initColumns()
    }

    componentDidMount(){
        this.getProducts(1)
    }

    render() { 

        const {products,total,searchType,} = this.state
        
          
         
         
        const title=(
            <span>
                <Select 
                    value={searchType} 
                    style={{width:150}}
                    onChange={(value)=>this.setState({searchType:value})}
                    >
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input 
                    placeholder=""关键字 
                    style={{width:150,margin:'0 15px'}} 
                    onChange={(e)=>this.setState({searchName:e.target.value})} 
                />
                <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra=(
            <Button type='primary'>
                <Icon type='plus' />
                添加商品
            </Button>
        )

        return ( 
            <Card title={title} extra={extra}>
                <Table 
                dataSource={products} 
                columns={this.columns} 
                rowKey='_id'
                bordered
                pagination={{
                    total,
                    defaultPageSize:PAGE_SIZE,
                    showQuickJumper:true,
                    onChange:(pageNum)=>{this.getProducts(pageNum)}
                    }}
                />;


               
            </Card>
         );
    }
}
 
export default ProductHome;