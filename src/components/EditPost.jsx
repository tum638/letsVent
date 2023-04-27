import { TextField } from "@mui/material";
import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
const EditPost = (id) => {

    const [post, setPost] = useState({ title: "", content: "" });
    const navigateTo = useNavigate();
    async function handleEditPost() {
        const {  data } = await supabase 
            .from("Post")
            .select("*")
            .eq('id', id.id)
            .limit(1)
        data[0].title = post.title;
        data[0].content = post.content;
        console.log(data[0]);
        const { error} = await supabase
            .from('Post')
            .update(data[0])
            .eq('id', id.id)
        console.log(error);

        navigateTo("../viewposts/")
    }
   
    return (
        <div className="create-posts">
            <div>
                <TextField label="title" size="small" onChange={(e) => {
                    let oldPost = post;
                    oldPost.title = e.target.value;
                    setPost(oldPost);
                }
                
                }></TextField>
            </div>
            <div >
                  <TextField
          id="filled-multiline-static"
          label="Content"
          multiline
          rows={4}
        onChange={(e) => {
                        let oldPost = post;
                        oldPost.content = e.target.value;
                        setPost(oldPost);
            }}
          variant="filled"
        />
            </div>
            <div >
                <button className="create-button" onClick={handleEditPost}>Edit Post</button>
            </div>  
        </div>
    )
}
export default EditPost;