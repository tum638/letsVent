import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { supabase } from '../client';
import { TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';



const ExpandMore = styled((props) => {
  const {  ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post, handleLikeIncrement }) {
  const [expanded, setExpanded] = React.useState(false);
    // const [post, setpost] = React.useState({});
    // const [upvotes, setUpvotes] = React.useState(post.upvotes);
    const [heartColor, setHeartColor] = React.useState("grey");
  const [comment, setComment] = React.useState("");
  const [ups, setUps] = React.useState(post.upvotes);
  const [commetsList, setCommentsList] = React.useState([])
    const navigateTo = useNavigate();
    useEffect(() => {
        if (post.upvotes > 0) {
            setHeartColor("red");
        }
    }, [post.upvotes, post])
    // useEffect(() => {
    //   setpost(post);

    // }, [post])
  useEffect(() => {
    setCommentsList(post.comments)
  }, [post])
  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
    
  function handleLike() {
    console.log("in ")
    setUps(ups + 1);
        const updateUpvotes = async () => {
        await supabase
            .from('Post')
            .update({ upvotes: post.id+1})
        .eq('id', post.id)
         }
    updateUpvotes();
    
    handleLikeIncrement()
    
    
    }
        
    
  async function handleComment(e) {
    e.stopPropagation();
        const {data } = await supabase
            .from("Post")
            .select()
            .eq("id", post.id)
            .limit(1)
            .single();
        // console.log(error)
        // console.log(data.comments)
        let previousComments = await data.comments;
        let updatedComment;
        if (previousComments != null) {
            if (comment.length != 0) {
               updatedComment = [...previousComments, comment]
            }  
        } else {
            updatedComment = [comment];
        }

        await supabase
        .from("Post")
            .update({ comments: updatedComment})
            .eq("id", post.id)
       
        setComment("");

        // window.location.reload();


    }
    function handleCardClick() {
        navigateTo(`viewfullpost/${post.id}`, {replace: true, state: post });
    }
    

    return (
      
      <Card onClick={handleCardClick} sx={{ width: 1000, backgroundColor: "#EEF0EB", marginTop:5 , color:"#153243", textAlign:"center"  }}>
      <CardHeader
        title={post?.title}
              subheader={new Date(post?.created_at).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
            
      />
      <CardContent>
              <Typography variant="body2" color="text.secondary">
   
          {post?.content}
        </Typography>
      </CardContent>
          <CardActions sx={{ width: 1000, display:"flex", justifyContent:"center", paddingLeft:"auto", paddingRight: "auto"}}>
        <div className="action-center"> 
        <IconButton aria-label="add to favorites">
                        <FavoriteIcon sx={{ color: heartColor }} onClick={(e) => {
                e.stopPropagation()
                handleLike();
        }} />
        </IconButton>
        <div>
        {ups} upvotes 
        </div>
    
                  
                    <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
              </div>

              <Button
                  onClick={handleComment}
                  size="small" variant="contained" sx={{ backgroundColor: "#153243", marginLeft: 5 }} >comment</Button>
              <TextField
          label="Leave a comment"
          id="outlined-size-small"
                  placeholder="leave a comment"
                  defaultValue=""
            size="small"
            onClick={(e)=>e.stopPropagation()}
                    onChange={(e) => {
                      setComment(e.target.value);
                  }}
        />

        
      
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent >
            {
              commetsList?.map((comment, idx) => {
                return  <Typography key={idx} paragraph sx={{ color: "EEF0EB" }}>
                  {"*" + " " + comment}
          </Typography>
              })
            }
         
        </CardContent>
      </Collapse>
    </Card>
  );
}
