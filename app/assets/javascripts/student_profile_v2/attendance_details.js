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
      border: '1px solid #eee',
      padding:15,
      marginTop: 10,
      marginBottom: 10,
      width: '100%'
    },
    item: {
      paddingBottom: 10
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
      borderBottom: '1px solid #333',
      paddingBottom: 10,
      marginBottom: 20,
      marginTop: 20,
      fontSize: 24
    },
    container: {
      width: '50%'
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
        this.renderDisciplineIncidents(),
        this.renderAbsences(),
        this.renderTardies(),
        this.renderIncidentHistory()
      );
    },

    renderDisciplineIncidents: function() {
      var flexibleRange = Scales.disciplineIncidents.flexibleRange(this.props.cumulativeDisciplineIncidents);
      return createEl(ProfileChart, {
        titleText: 'Discipline incidents, last 4 years',
        yAxis: {
          min: flexibleRange[0],
          max: flexibleRange[1],
          title: { text: 'Count per year' }
        },
        quadSeries: [{
          name: 'Events per school year',
          data: this.props.cumulativeDisciplineIncidents
        }]
      });
    },

    renderAbsences: function() {
      var range = Scales.absences.flexibleRange(this.props.cumulativeAbsences);
      return createEl(ProfileChart, {
        titleText: 'Absences, last 4 years',
        yAxis: {
          min: range[0],
          max: range[1],
          title: { text: 'Count per year' }
        },
        quadSeries: [{
          name: 'Absences per school year',
          data: this.props.cumulativeAbsences
        }]
      });
    },

    renderTardies: function() {
      var range = Scales.tardies.flexibleRange(this.props.cumulativeTardies);
      return createEl(ProfileChart, {
        titleText: 'Tardies, last 4 years',
        yAxis: {
          min: range[0],
          max: range[1],
          title: { text: 'Count per year' }
        },
        quadSeries: [{
          name: 'Tardies per school year',
          data: this.props.cumulativeTardies
        }]
      });
    },

    renderIncidentHistory: function() {
      return dom.div({ style: styles.container },
        dom.h4({ style: styles.title }, 'Incident History'),
        (this.props.disciplineIncidents.length === 0) ? dom.div({}, 'None') : this.props.disciplineIncidents.map(function(incident) {
        return dom.div({
          style: styles.box,
          key: [incident.occurred_at, incident.incident_description].join()
        },
          dom.div({ style: styles.header },
            dom.div({ style: styles.item }, dom.span({ style: styles.itemHead }, 'Date: '), dom.span({}, moment.utc(incident.occurred_at).format('MMM D, YYYY'))),
            dom.div({ style: styles.item }, dom.span({ style: styles.itemHead }, 'Code: '), dom.span({}, incident.incident_code)),
            dom.div({ style: styles.item }, dom.span({ style: styles.itemHead }, 'Location: '), dom.span({}, incident.incident_location))
          ),
          dom.div({}, dom.span({ style: styles.desc }, 'Description: '), dom.div({}, incident.incident_description))
        )
      }));
    },
  });
})();