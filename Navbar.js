document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <nav class="navbar navbar-expand-lg" style="background-color: rgb(1, 1, 81); padding: 0.2rem 0.2rem;">
            <div class="container-fluid">
                <a class="navbar-brand" href="#" style="-webkit-text-fill-color: white; font-size: 1rem;">RookOut</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="..//index.html" style="-webkit-text-fill-color: white; font-size: 1rem;">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="Records\\Records.html" style="-webkit-text-fill-color: white; font-size: 1rem;">Attendance</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="" style="-webkit-text-fill-color: white; font-size: 1rem;">Activities</a>
                        </li>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="text" id="searchBar" placeholder="Search Attendance Records" aria-label="Search" style="font-size: 0.9rem; width: 300px; height: 35px;">
                        </form>
                    </ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="-webkit-text-fill-color: white; font-size: 1rem;">
                                Account
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Switch</a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                 <li><a class="dropdown-item" href="Instructor\\Todo.html">Instructor</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    document.getElementById('navbar').innerHTML = navbarHTML;
});
