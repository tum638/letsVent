import HomepageButtons from "../components/HomepageButtons"
export default function HomePage() {
    return (
        <div className="homepage center-page">
            <div className="center-page">
            <h1 className="centered-text">Welcome to Williams News Forum!</h1>
            <h2 className="secondary-header centered-text" >You can get started by creating or viewing already existing posts</h2>
            </div>
            <div>
                <HomepageButtons />
            </div>
        </div>
    )
}
