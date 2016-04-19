(function() {
  window.shared || (window.shared = {});
  var dom = window.shared.ReactHelpers.dom;
  var createEl = window.shared.ReactHelpers.createEl;
  var merge = window.shared.ReactHelpers.merge;

  var ProfileChart = window.shared.ProfileChart;
  var QuadConverter = window.shared.QuadConverter;
  var Scales = window.shared.Scales;

  var styles = {
    box: {
      border: '1px solid #ccc',
      padding:15,
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      backgroundColor: '#f2f2f2'
    },
    item: {
      paddingBottom: 10,
      width: 160
    },
    itemHead: {
      fontWeight: 'bold',
    },
    header: {
      display: 'flex',
      flexFlow: 'row',
      justifyContent: 'space-between'
    },
    desc: {
      fontWeight: 'bold',
      paddingTop: 30
    },
    title: {
      color: 'black',
      paddingBottom: 20,
      fontSize: 24
    },
    container: {
      width: '100%',
      marginTop: 50,
      marginLeft: 'auto',
      marginRight: 'auto',
      border: '1px solid #ccc',
      padding: '30px 30px 30px 30px',
      position: 'relative'
    },
    centerItem: {
      paddingBottom: 10,
      textAlign: 'center',
      width: 75
    },
    secHead: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #333',
      position: 'absolute',
      top: 30,
      left: 30,
      right: 30
    },
    navBar: {
      fontSize: 18
    },
    navTop: {
      textAlign: 'right',
      verticalAlign: 'text-top'
    }
  };

  var AttendanceDetails = window.shared.AttendanceDetails = React.createClass({
    displayName: 'AttendanceDetails',
    propTypes: {
      cumulativeDisciplineIncidents: React.PropTypes.array.isRequired,
      cumulativeAbsences: React.PropTypes.array.isRequired,
      cumulativeTardies: React.PropTypes.array.isRequired,
      disciplineIncidents: React.PropTypes.array.isRequired
    },

    // TODO(kr) clicking on data point jumps to timeline with full details
    render: function() {
      return dom.div({ className: 'AttendanceDetails' },
        this.renderNavBar(),
        this.renderDisciplineIncidents(),
        this.renderAbsences(),
        this.renderTardies(),
        this.renderIncidentHistory()
      );
    },

    renderNavBar: function() {
      return dom.div({ style: styles.navBar },
          dom.a({ style: styles.navBar, href: '#disciplineChart'}, 'Discipline Chart'), ' | ',
          dom.a({ style: styles.navBar, href: '#absences'}, 'Absences Chart'), ' | ',
          dom.a({ style: styles.navBar, href: '#tardies'}, 'Tardies Chart'), ' | ',
          dom.a({ style: styles.navBar, href: '#history'}, 'Incident History')
        );
    },

    renderHeader: function(title) {
      return dom.div({ style: styles.secHead },
        dom.h4({ style: styles.title }, title),
        dom.span({ style: styles.navTop }, dom.a({ href: '#' }, 'Back to top'))
      );
    },

    renderDisciplineIncidents: function() {
      var flexibleRange = Scales.disciplineIncidents.flexibleRange(this.props.cumulativeDisciplineIncidents);
      return dom.div({ id: 'disciplineChart', style: styles.container},
        this.renderHeader('Discipline incidents, last 4 years'),
        createEl(ProfileChart, {
          titleText: '',
          yAxis: {
            min: flexibleRange[0],
            max: flexibleRange[1],
            title: { text: 'Count per year' }
          },
          quadSeries: [{
            name: 'Events per school year',
            data: this.props.cumulativeDisciplineIncidents
          }]
        }));
    },

    renderAbsences: function() {
      var range = Scales.absences.flexibleRange(this.props.cumulativeAbsences);
      return dom.div({ id: 'absences', style: styles.container},
        this.renderHeader('Absences, last 4 years'),
        createEl(ProfileChart, {
        titleText: '',
        yAxis: {
          min: range[0],
          max: range[1],
          title: { text: 'Count per year' }
        },
        quadSeries: [{
          name: 'Absences per school year',
          data: this.props.cumulativeAbsences
        }]
      }));
    },

    renderTardies: function() {
      var range = Scales.tardies.flexibleRange(this.props.cumulativeTardies);
      return dom.div({ id: 'tardies', style: styles.container},
        this.renderHeader('Tardies, last 4 years'),
        createEl(ProfileChart, {
        titleText: '',
        yAxis: {
          min: range[0],
          max: range[1],
          title: { text: 'Count per year' }
        },
        quadSeries: [{
          name: 'Tardies per school year',
          data: this.props.cumulativeTardies
        }]
      }));
    },

    renderIncidents: function() {
      return dom.div({ style: { paddingTop: 60 }}, this.props.disciplineIncidents.map(function(incident) {
        return dom.div({ style: styles.box, key: incident.occurred_at },
          dom.div({ style: styles.header },
            dom.div({ style: styles.item }, dom.span({ style: styles.itemHead }, 'Date: '), dom.span({}, moment.utc(incident.occurred_at).format('MMM D, YYYY'))),
            dom.div({ style: styles.centerItem }, dom.span({ style: styles.itemHead }, 'Code: '), dom.span({}, incident.incident_code)),
            dom.div({ style: styles.item }, dom.span({ style: styles.itemHead }, 'Location: '), dom.span({}, incident.incident_location))
          ),
          dom.div({}, dom.span({ style: styles.desc }, 'Description: ')),
          dom.div({}, incident.incident_description))

      }));
    },

    renderIncidentHistory: function() {
      return dom.div({ id: "history", style: styles.container },
        this.renderHeader('Incident History'),
        (this.props.disciplineIncidents.length > 0) ? this.renderIncidents() : dom.div({ style: {paddingTop: 60}}, 'No Incidents')
      );
    },
  });
})();