import { useNavigate } from "react-router-dom"
const HomepageButtons = () => {
    const navigateTo = useNavigate();
    function handleViewPost() {
        navigateTo("viewposts/");
    }
    function handleCreatePost() {
        navigateTo("createpost/")
    }
    return (
        <div className="home-page-buttons center-div">
            <button className="primary-button" onClick={handleViewPost}>View Posts</button>
            <button className="primary-button" onClick={handleCreatePost}>Create Posts</button>
        </div>
    )
}
export default HomepageButtons