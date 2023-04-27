import { TextField } from "@mui/material";
import { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
    const [post, setPost] = useState({ title: "", content: "" });
    const navigateTo = useNavigate();
    async function handleCreatePost() {
        const { error, data } = await supabase
            .from('Post')
            .insert(post)
            .select();
        console.log(error);
        console.log(data);
        alert("Post Successfully created")
        navigateTo("/")
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
                <button className="create-button" onClick={handleCreatePost}>Create Post</button>
            </div>  
        </div>
    )
}
export default CreatePost;