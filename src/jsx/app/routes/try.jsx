var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var Field = React.createClass({
    render : function() {
        console.log("RENDERING NEW FIELD : " + this.props.fieldIndex)
        return (
            <Col sm={6} className="row-centered">
                <PanelContainer controlStyles='bg-lightgreen fg-white'>
                    <PanelHeader className='bg-lightgreen fg-white'>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>Tabs: Basic</h3>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelHeader>
                    <PanelBody>
                        <TabList bsStyle='green'>
                            <Tab pane={'tab' + this.props.fieldIndex + ':home'} active>Home</Tab>
                            <Tab pane={'tab' + this.props.fieldIndex + ':profile'}>Profile</Tab>
                            <Tab>
                                <DropdownButton tab container={this} menu={'tabmenu' + this.props.fieldIndex}>
                                    <span>Dropdown </span><Caret/>
                                </DropdownButton>
                                <Menu autoHide bsStyle='lightgreen' ref={'tabmenu' + this.props.fieldIndex}>
                                    <MenuItem href='#'>
                                        <Tab dropdown pane={'tab' + this.props.fieldIndex + ':fat'}>
                                            @fat
                                        </Tab>
                                    </MenuItem>
                                    <MenuItem href='#'>
                                        <Tab dropdown pane={'tab' + this.props.fieldIndex + ':mdo'}>
                                            @mdo
                                        </Tab>
                                    </MenuItem>
                                </Menu>
                            </Tab>
                        </TabList>
                        <Grid>
                            <Row>
                                <Col xs={12} style={{paddingTop: 12.5}}>
                                    <TabContent>
                                        <TabPane tab={'tab' + this.props.fieldIndex + ':home'} active>
                                            {'tab' + this.props.fieldIndex + ':home'}

                                        </TabPane>
                                        <TabPane tab={'tab' + this.props.fieldIndex + ':profile'}>
                                            <p><LoremIpsum query='3s' /></p>
                                        </TabPane>
                                        <TabPane tab={'tab' + this.props.fieldIndex + ':fat'}>
                                            <p><LoremIpsum query='3s' /></p>
                                        </TabPane>
                                        <TabPane tab={'tab' + this.props.fieldIndex + ':mdo'}>
                                            <p><LoremIpsum query='3s' /></p>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelBody>
                </PanelContainer>

            </Col>
        )
    }
});

var Fields = React.createClass({
    render : function() {
        console.log("Rendering fields : " + this.props.fields);
        var fields = this.props.fields.map(function(field) {
            return (
                <Field fieldIndex={field.index}></Field>
            );
        });

        console.log(fields);

        return (
            <div>
                {fields}
            </div>

        )
    }
});

var Body = React.createClass({
    getInitialState : function() {
        return {fields : [], counter : 0};
    },
    addNewField : function() {
        console.log("CLICKED");

        var currentCounter = this.state.counter;
        this.setState({counter : ++currentCounter});

        var currentFields = this.state.fields;
        var newFields = currentFields.concat({index : this.state.counter})
        this.setState({fields : newFields});

        console.log("After setting , fields : " + this.state.fields + "   and counter " + this.state.counter);
    },
    render : function() {
        return (
            <Container id='body'>
                <Grid>
                    <Row>
                        <Col>
                            <Button onClick={this.addNewField} outlined bsStyle='desaturateddarkblue' style={{marginLeft:23}}>Add New Field</Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Fields fields={this.state.fields} />

                    </Row>
                </Grid>
            </Container>
        )
    }
});


var Page = React.createClass({
    mixins: [SidebarMixin],
    render: function() {
        var classes = React.addons.classSet({
            'container-open': this.state.open
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
});

module.exports = Page;