import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'search-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class SearchComponent {
  @State() query: string = '';
  @State() responseText: string = '';
  @State() references: string[] = [];
  @State() hasResponse: boolean = false;
  @State() isLoading: boolean = true;
  @State() errorMessage: string = '';

  @Prop() userId: string = 'user_2kuZqCuRDxg9ngVGCeq57qfW86S';
  @Prop() apiKey: string = '3a65b79fdd90231cbb996725cab116282f872724318b7c030a202b7e3ea3bc53';
  @Prop() fontSize: string = '16px';
  @Prop() fontStyle: string = 'normal';
  @Prop() fontFamily: string = 'Arial, sans-serif';
  @Prop() themeColor: string = '#007BFF'; // Default blue
  @Prop() widthDimension: string = '100%';
  @Prop() variant: number = 1;

  async componentWillLoad() {
    try {
      if (!this.apiKey) throw new Error('API key is required.');

      if (!this.userId) throw new Error('Invalid user-id');

      const isValid = await this.validateApiKey(this.apiKey);

      if (!isValid) throw new Error('Invalid API key.');

      this.isLoading = false;
    } catch (error) {
      this.errorMessage = (error as Error).message;
      this.isLoading = false;
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const URI = `http://localhost:9002/api/widget/users/${this.userId}/validate-key?apiKey=${apiKey}`;

      const response = await fetch(URI, {
        method: 'GET',
      });

      const result = await response.json();

      if (response.ok && result.status) return true;
      else {
        console.error('API Key validation failed:', result.message);
        return false;
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      return false;
    }
  }

  handleSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.query = input.value;
  }

  async handleSearchSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.query.trim() !== '') {
      // Simulate an AI-generated response
      this.responseText =
        " is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometim";
      this.references = ['https://example.com/reference1', 'https://example.com/reference2'];
      this.hasResponse = true;
    } else if (event.key === 'Enter') {
      this.responseText = '';
      this.references = [];
      this.hasResponse = false;
    }
  }

  renderLoading() {
    return <div class="loading">Loading...</div>;
  }

  renderError() {
    return <div class="error">{this.errorMessage}</div>;
  }

  renderNoResponse() {
    return (
      <div class="no-response">
        <p>
          Here, you can experiment with design templates using realtime data rendered within the component. Simply enter a prompt in the search bar and press "Enter" to view the
          results.
        </p>
      </div>
    );
  }

  renderResponseSectionVarient01() {
    return (
      <div class="response-section">
        <div class="response-text">
          <p>{this.responseText}</p>
        </div>
        <div class="references">
          <span class="subheading">References</span>
          <ol>
            {this.references.map(ref => (
              <li>
                <a href={ref} target="_blank">
                  {ref}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  renderResponseSectionVarient02() {
    return (
      <div class="response-section">
        <div class="response-text">
          <p>{this.responseText}</p>
        </div>
      </div>
    );
  }

  render() {
    const styleVars = {
      '--font-size': this.fontSize,
      '--font-style': this.fontStyle,
      '--font-family': this.fontFamily,
      '--theme-color': this.themeColor,
      '--width-dimension': this.widthDimension,
    };

    if (this.isLoading) {
      return (
        <div class="search-container" style={styleVars}>
          {this.renderLoading()}
        </div>
      );
    }

    if (this.errorMessage) {
      return (
        <div class="search-container" style={styleVars}>
          {this.renderError()}
        </div>
      );
    }

    return (
      <div class="search-container" style={styleVars}>
        <span class="subheading">Search Bar</span>
        <div class="search-box">
          <span class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#27274b">
              <path d="M10 2a8 8 0 015.29 13.71l5 5a1 1 0 01-1.42 1.42l-5-5A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Enter your search query..."
            value={this.query}
            onInput={event => this.handleSearchChange(event)}
            onKeyDown={event => this.handleSearchSubmit(event)}
          />
        </div>
        <span class="subheading">Given Instruction</span>
        {this.hasResponse ? (this.variant === 1 ? this.renderResponseSectionVarient01() : this.renderResponseSectionVarient02()) : this.renderNoResponse()}
      </div>
    );
  }
}
