'use strict';

var Header = require('../../common/header.jsx');
var Sidebar = require('../../common/sidebar.jsx');
var Footer = require('../../common/footer.jsx');

var ReactStyle = require('../../react-styles/src/ReactStyle.jsx');

var FieldTypes = {
    CHECKBOX : 'CHECKBOX',
    SELECTBOX : 'SELECTBOX',
    RADIO : 'RADIO',
    HSELECTBOX : 'HSELECTBOX',
    TEXT : 'TEXT',
    MAP : 'MAP',
    PICTURE : 'PICTURE',
    MULTIPLE_SELECT : 'MULTIPLE_SELECT'
};


var Field = React.createClass({
    getInitialState : function() {
        return {fieldName : ''};
    },
    componentDidMount: function() {
        var fieldIndex = this.props.fieldIndex;
        //If I remove this does not work
        $('#wizard-' + fieldIndex).steps({
            onStepChanging: function (event, currentIndex, newIndex) {
                $('#form-' + fieldIndex).validate().settings.ignore = ':disabled,:hidden';
                return $('#form-' + fieldIndex).valid();
            },
            onFinishing: function (event, currentIndex) {
                $('#form-' + fieldIndex).validate().settings.ignore = ':disabled';
                return $('#form-' + fieldIndex).valid();
            },
            onFinished: function (event, currentIndex) {
                alert('Submitted!');
            }
        });
    },
    validationState : function() {
        var length = this.state.fieldName.length;
        if (length > 10) { return 'success'; }
        else if (length > 5) { return 'warning'; }
        else if (length > 0) { return 'error'; }
    },

    handleChange(event) {
        // This could also be done using ReactLink:
        // http://facebook.github.io/react/docs/two-way-binding-helpers.html
        this.setState({
            fieldName: event.target.value
        });
    },
    render: function() {
        return (
            <PanelContainer noOverflow controlStyles='bg-pink fg-white'>
                <Panel>
                    <PanelHeader className='bg-black fg-white' style={{margin: 0}}>
                        <Grid>
                            <Row>
                                <Col xs={12}>
                                    <h3>jQuery Steps: Basic form example with Validation</h3>
                                </Col>
                            </Row>
                        </Grid>
                    </PanelHeader>
                    <PanelBody>
                        <Form id={'form-' + this.props.fieldIndex}>
                            <div id={'wizard-' + this.props.fieldIndex}>
                                <h1>Select Field Type</h1>
                                <div>
                                    <Grid>
                                        <Row>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col style={{marginTop:5}} sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>
                                            <Col sm={3} xs={12} collapseLeft>
                                                <img src='http://wpquestions.com/uploads/tma_example_of_select_box.png_50528587_phphYEY7r.png'/>
                                            </Col>

                                        </Row>
                                    </Grid>
                                </div>

                                <h1>Select field Naming</h1>
                                <div>

                                    <FormGroup>
                                        <Label htmlFor='field-name'>Field Name</Label>
                                        <input id='field-name'
                                               type='text'
                                               className='required'
                                               value={this.state.fieldName}
                                               //THIS DOES NOT WORK
                                               bsStyle={this.validationState()}
                                               hasFeedback
                                               help='Validation is based on string length.'
                                               groupClassName='group-class'
                                               labelClassName='label-class'
                                               onChange={this.handleChange}
                                        />
                                    </FormGroup>

                                </div>

                                <h1>third</h1>
                                <div id={'third-' + this.props.fieldIndex}>

                                </div>
                            </div>
                        </Form>
                    </PanelBody>
                </Panel>
            </PanelContainer>
        )
    }
});

var Fields = React.createClass({
    render : function() {
        console.log("Rendering fields : " + this.props.fields);
        var fields = this.props.fields.map(function(field) {
            return (
                <Field key={field.index} fieldIndex={field.index}></Field>
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
                        <Col xs={12}>
                            <Fields fields={this.state.fields} />
                        </Col>
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