class NoteInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow( { mode: 'open' } );
    }

    getTemplate() {
        const template = document.createElement( 'template' );
        template.innerHTML = `
            <div class="container">
                <div class="content">
                    <textarea autofocus placeholder="Write your note ..." rows="6"></textarea>
                    <button>save</button>
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
        const noteText = this.shadowRoot.querySelector('textarea');
        if( !noteText.value.trim() ) {
            noteText.value = '';
            return;
        }
        document.dispatchEvent( new CustomEvent( 'x-add-note', { detail: noteText.value } ) );
        noteText.value = '';
        noteText.focus();
    }

    render() { 
        this.shadowRoot.appendChild( this.getTemplate().content.cloneNode( true ) ); 
        // events
        this.button = this.shadowRoot.querySelector('button');
        this.button.addEventListener( 'click', () => this.handleClick() );
    }

    connectedCallback() { this.render() }

    disconnectedCallback() {
        this.button.removeEventListener( 'click', () => {} );
    }
}

customElements.define( 'note-input', NoteInput );