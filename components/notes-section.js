class NotesSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow( { mode: 'open' } );
    }

    getTemplate() {
        const template = document.createElement( 'template' );
        template.innerHTML = `
            <div class="container"></div>
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
                    margin-top: 16px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
            </style>
        `
    }

    addNote( text ) {
        const notesContainer = this.shadowRoot.querySelector('div.container');
        notesContainer.insertAdjacentHTML( 'beforeend', `<note-card text="${text}"></note-card>` )
    }

    render() { 
        this.shadowRoot.appendChild( this.getTemplate().content.cloneNode( true ) );
        document.addEventListener( 'x-add-note', (data) => { this.addNote(data.detail)} )
    }

    connectedCallback() { this.render() }

    disconnectedCallback() {}
}

customElements.define( 'notes-section', NotesSection );