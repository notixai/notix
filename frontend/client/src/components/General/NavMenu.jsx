export default function NavMenu(){
    return(
        <nav className="nav-menu">
            <h2>Notix</h2>
            <div className="navigation classroom-navigation">
                <h2 className="navigation-label label">Classes</h2>
                <ol className="user-classrooms">
                    <li className="user-classroom">Dummy 1</li>
                    <li className="user-classroom">Dummy 2</li>
                    <li className="user-classroom">Dummy 3</li>
                </ol>
            </div>
            <div className="navigation notebook-navigation">
                <h2 className="label navigation-label notebook-label">
                    Notebooks
                </h2>
                <ol className="user-notebooks">
                    <li className="user-notebooks">Dummy 1</li>
                    <li className="user-notebooks">Dummy 2</li>
                    <li className="user-notebooks">Dummy 3</li>
                </ol>
            </div>
        </nav>
    )
    
}