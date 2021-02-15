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
                    <slot></slot>
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
                    max-width: 1000px;
                    padding: 0 16px 0 16px;
                    display: flex;
                    flex-direction: column;
                }
            </style>
        `
    }

    render() { this.shadowRoot.appendChild( this.getTemplate().content.cloneNode( true ) ); }

    connectedCallback() { this.render() }
}

customElements.define( 'page-layout', PageLayout );