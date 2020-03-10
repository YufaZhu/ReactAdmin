import React, { Component } from 'react';
import {Card,Table,Select,Input,Button,Icon,message} from 'antd'
import LinkButton from './../../components/link-button'
import { reqProducts, reqSearchProducts,reqUpdateProductStatus } from './../../api'
import {PAGE_SIZE} from './../../utils/constants'

const Option = Select.Option

class ProductHome extends Component {
    
    state={
        products:[],
        total:0,
        searchType:'productName', // 搜索类型 productName / productDesc
        searchName:'',  // 搜索关键字
    }

    updateStatus= async(productId,status)=>{
        const result = await reqUpdateProductStatus(productId,status);
        if(result.status===0){
            message.success('更新商品状态成功')
            this.getProducts(this.pageNum)
        }
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
              //dataIndex: 'status',
              render:(product)=>{
                  const {status,_id} = product
                  return(
                      <span>
                        <Button type='primary' onClick={()=>this.updateStatus(_id,status===1?2:1)}>
                            {status===1 ? '下架':'上架'}
                        </Button>
                        <span>{status===1 ? '在售':'已下架'}</span>
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
                          <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                          <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                        </span>
                    )
                }
              },
          ];
          
    }

    getProducts=async(pageNum)=>{
        //保存pageNum，让其他方法可以看到
        this.pageNum = pageNum
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
            <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
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