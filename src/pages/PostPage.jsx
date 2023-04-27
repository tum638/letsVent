
import Post from "../components/Post";
import { supabase } from "../client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const PostsPage = () => {
    const [posts, setPosts] = useState([])
    const [upvotesButton, setUpvotesButton] = useState("outlined");
    const [dateButton, setDateButton] = useState("contained");
    const [searchResult, setSearchResult] = useState("");
    const navigateTo = useNavigate();
    const fetchPosts = async () => {
        const { data } = await supabase
                .from('Post')
                .select()
            .order(dateButton == "contained"? "created_at":"upvotes", { ascending: false })
            setPosts(data);
            
        }
    useEffect(() => {
        
        fetchPosts();
        
    }, [dateButton, upvotesButton])
    function handleLikeIncrement() {
        fetchPosts();
    }
    function handleSearch() {
        let post = posts.filter((post) => {
            return post.title == searchResult;
        })
        console.log(post[0].id)
        navigateTo(`viewfullpost/${post[0].id}`, { replace: true, state: post[0]})
    }

    return (
        <div className="posts">
            <div className="ordering">
                <h3 className="ordering-child">Order by: </h3>
                <Button onClick={() => {
                    setDateButton("contained")
                    setUpvotesButton("outlined")
                 }} sx={{marginLeft: 2}} variant={dateButton}  onClic>Date</Button>
                <Button onClick={() => {
                    setDateButton("outlined");
                    setUpvotesButton("contained");
                }} sx={{marginLeft: 2, }}  variant={upvotesButton}>Upvotes</Button>
            </div>
            <div className="search">
                <Autocomplete
      disablePortal
                    id="combo-box-demo"
                inputValue={searchResult}
                    onInputChange={(e, newInputValue) => {
                            setSearchResult(newInputValue);
                    }
              
                    }
                options={posts}
                getOptionLabel={(posts) => posts.title}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search for a post by title" />}
            />
                <SearchIcon onClick={handleSearch} />
            </div>
            
       {
                posts.map((post, idx) => {
                    return <Post key={idx} post={post} handleLikeIncrement={handleLikeIncrement}/>
                })
            }
        </div>
    )
}
export default PostsPage;