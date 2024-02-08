export default function NavMenu(){
    return(
        <nav className="nav-menu">
            <div className="navigation classroom-navigation">
                <h2 className="navigation-label label">Classrooms</h2>
                <ol className="user-classrooms"></ol>
            </div>
            <div className="navigation notebook-navigation">
                <h2 className="label navigation-label notebook-label">
                    Notebooks
                </h2>
                <ol className="user-notebooks"></ol>
            </div>
        </nav>
    )
    
}