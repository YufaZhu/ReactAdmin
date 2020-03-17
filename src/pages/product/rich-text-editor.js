import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
/*用来指定商品详情信息的富文本编程器组件
*/
class RichTextEditor extends Component {
    static propTypes = {
        detail: PropTypes.string
    }

    constructor(props){
        super(props)
        const detail = this.props.detail
        if(detail){
            const contentBlock = htmlToDraft(detail)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state={
                editorState,
            }
        }else{
            this.state={
                editorState:EditorState.createEmpty(),
            }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }
    /*得到输入的富文本数据
    */
    getDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    render() {
        const { editorState } = this.state
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ minheight: 250, border: '1px solid #000', paddingLeft: 10 }}
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}

export default RichTextEditor;