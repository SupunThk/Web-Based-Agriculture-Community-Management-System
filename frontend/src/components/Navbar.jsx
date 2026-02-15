import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-3" to="/blogs">AggroLink</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav gap-3">
                        <li className="nav-item"><Link className="nav-link text-white" to="/blogs">Blogs</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/knowledge-base">Knowledge Base</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/marketplace">Marketplace</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/events">Events</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/ask-an-expert">Ask an Expert</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/ai">AI</Link></li>
                        <li className="nav-item"><Link className="nav-link text-white" to="/admin">Admin Panel</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
