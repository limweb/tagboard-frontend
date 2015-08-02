import classNames from 'classnames';
import SidebarMixin from 'global/jsx/sidebar_component';

import Header from 'common/header';
import Sidebar from 'common/sidebar';
import Footer from 'common/footer';

var StructuredFilter = require('../structured-filter/main.jsx');
var GriddleWithCallback = require('griddle-callback');

class Body extends React.Component {

	getData() {

	}

	render() {
		var data = [
			{
				"ehehe" : "hihh",	
				"ehehe2" : "hihh",
				"ehehe3" : "hihh",
				"ehehe4" : "hihh"
			},
			{
				"ehehe" : "hihh",	
				"ehehe2" : "hihh",
				"ehehe3" : "hihh",
				"ehehe4" : "hihh"
			},
			{
				"ehehe" : "hihh",	
				"ehehe2" : "hihh",
				"ehehe3" : "hihh",
				"ehehe4" : "hihh"
			}
			
		];

		return (
			<Container id='body'>
				<Grid>
					<Row>
						<Col xs={12}>
							<PanelContainer>
								<Panel>
									<PanelBody>
										<StructuredFilter 
											placeholder="Pick filter"
								          options={[
								            {category:"Name",type:"text"},
								            {category:"Price",type:"number"},
								            {category:"MarketCap",type:"number"},
								            {category:"IPO", type:"date"},
								            ]}
								          customClasses={{
								            input: "filter-tokenizer-text-input",
								            results: "filter-tokenizer-list__container",
								            listItem: "filter-tokenizer-list__item"
								          }}
										/>
										<GriddleWithCallback getExternalResults = {this.getData} />
									</PanelBody>
								</Panel>
							</PanelContainer>
						</Col>
						

					</Row>
				</Grid>
			</Container>
		);
	}
}


@SidebarMixin
export default class extends React.Component {
  render() {
    var classes = classNames({
      'container-open': this.props.open
    });

    return (
      <Container id='container' className={classes}>
        <Sidebar />
        <Header />
        <Body />
        <Footer />
      </Container>
    );
  }
}
