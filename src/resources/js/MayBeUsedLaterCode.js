/**
 * Here we place the code we have written in some point of time and it has not been used,
 * but we do not want to throw it away.
 */


// Old Login Component
// Has the name changer in it
class Login extends React.Component
{
    constructor() {
        super();

        // State
        this.state = {
            welcomeName: '...',
            welcomeSurname: '',
            userName: '',
            faculty: '',
            year: '',
            sex: '',
            cantLogin: true
        }

        // Method mapping
        this.nameInput = this.nameInput.bind(this);
    }

    loginCalls = e =>
    {
        this.canLogin();
        this.nameInput(e);
    }

    canLogin()
    {
        if (this.state.welcomeName === '...' || !this.state.welcomeName)
        {
            this.setState({cantLogin: false})
        }        
    }

    /**
     * 
     * @param {Event} e. The event passed in when the input changes
     * 
     * Reads the name that the user inputs and formats it so it outputs nicelly.
     */
    nameInput(e) {
        // Κάνε κεφαλαίο το πρώτο γράμμα
        let name = e.target.value.charAt(0).toUpperCase() + e.target.value.substring(1);

        /**
         * Αν το όνομα έχει περισσότερα από 6 γράμματα και τελειώνει σε ος, κατά πάσα πιθανότητα τονίζεται στην πρόπαραλήγουσα.
         * Σε αυτή την περίπτωση, στην αιτιατική το όνομα λήγει σε 'ε'. πχ: Δημήτριος -> Δημήτρης αλλά Δήμος -> Δήμο (όχι Δήμε)
         * Χωράει αμφισβήτηση και περισσότερο testing/brainstorming
         */
        if (name.length >= 6 && name.indexOf('ο') === (name.length - 2) && name.indexOf('ς') === (name.length - 1)) {
            name = name.substr(name, name.indexOf('ς') - 1) + 'ε';
        }
        // Αν το όνομα λήγει σε ς, αφαίρεσε το
        else if (name.indexOf('ς') !== -1) {
            name = name.substr(name, name.indexOf('ς'))
        }

        // Update state
        this.setState({
            welcomeName: name
        })
    }

    signUp()
    {
        alert('Not ready yet, fagget!')
    }

    render() {
        return (
            <div>
                <h2>Γεια σου {this.state.welcomeName}</h2>
                <div className="form-container">
                    <form>
                        <input type="text" placeholder="Όνομα" onChange={this.loginCalls}></input><br></br>

                        <input type="text" placeholder="Επόνυμο"></input><br></br>

                        <input type="text" placeholder="Username"></input><br></br>

                        <input type="text" placeholder="Σχολή"></input><br></br>

                        <input type="email" placeholder="Email"></input><br></br>

                        <input type="password" placeholder="Κωδικός"></input><br></br>
                    </form>
                </div>

                <ButtonGroup>
                    <Button variant="primary" size="lg" disabled={this.state.cantLogin}>
                        Login
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="primary" size="lg" onClick={this.signUp}>
                        Sign Up
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}