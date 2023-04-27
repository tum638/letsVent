import EditPost from "./EditPost";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const ViewFullPost = () => {
    const location = useLocation();
    const navigateTo = useNavigate();
    return (
        <div>
            <div className="viewfullpost">
            <div className="post-viewing">
                <h1>{location.state.title}</h1>
                <p>{location.state.content}</p>

                <ul></ul>
            </div>

            <div className="post-editing">
                <EditPost id={location.state.id} />
            </div>
    
            </div>
            <div className="delete-button">
                <Button
                    onClick={async (e) => {
                        await supabase
                        .from('Post')
                        .delete()
                        .eq('id', location.state.id)
                        navigateTo("../viewposts")
                    }}
                    sx={{
                    backgroundColor: "maroon", color: "white", ":hover": {
                        backgroundColor: "grey",
                        borderColor: "grey"
                }} } variant="outlined" startIcon={<DeleteIcon />}>
  Delete Post
</Button>
            </div>
        </div>
        
    )
}
export default ViewFullPost