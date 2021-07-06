class PageLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow( { mode: 'open' } );
    }

    getTemplate() {
        const template = document.createElement( 'template' );
        template.innerHTML = `
            <div class="container">
                <div class="content">
                    <slot name="input"></slot>
                </div>
                <div class="content">
                    <slot name="notes"></slot>
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
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .content {
                    width: 100%;
                    padding: 0 16px 0 16px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            </style>
        `
    }

    render() { this.shadowRoot.appendChild( this.getTemplate().content.cloneNode( true ) ); }

    connectedCallback() { this.render() }
}

customElements.define( 'page-layout', PageLayout );