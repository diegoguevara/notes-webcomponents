class NoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow( { mode: 'open' } );
        this.text = this.getAttribute('text');
    }

    getTemplate() {
        const template = document.createElement( 'template' );
        template.innerHTML = `
            <div class="container">
                <div class="header"></div>
                <div class="content">
                    <textarea placeholder="Write your note ..." rows="6"></textarea>
                    <button>delete</button>
                </div>
            </div>
            ${this.getStyles()}
        `
        return template;
    }

    getStyles() {
        return `
            <style>
                .container {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .content {
                    width: 100%;
                    max-width: 300px;
                    padding: 0 16px 0 16px;
                    display: flex;
                    flex-direction: column;
                }
                textarea {
                    border: 0px solid rgba(0,0,0,.1);
                    background: rgba(0,0,0,.1);
                    font-size: 16px;
                    padding: 16px;
                }
                button {
                    border: 0;
                    background: rgba(0,0,0,.1);
                    padding: 8px;
                }
            </style>
        `
    }

    handleClick() {
        let container = this.shadowRoot.querySelector('div.container');
        container.parentNode.removeChild(container);
    }

    render() { 
        this.shadowRoot.appendChild( this.getTemplate().content.cloneNode( true ) );
        // assign initial value
        const noteText = this.shadowRoot.querySelector('textarea');
        noteText.value = this.text;
        // set listener for delete btn
        this.button = this.shadowRoot.querySelector('button');
        this.button.addEventListener( 'click', () => this.handleClick() );
    }

    connectedCallback() { this.render() }

    disconnectedCallback() {}
}

customElements.define( 'note-card', NoteCard );