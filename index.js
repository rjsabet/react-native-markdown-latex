import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';
import {merge, isEqual, isArray} from 'lodash';
import SimpleMarkdown from 'simple-markdown';
//import styles from './styles';

const { width, height } = Dimensions.get('window');

class Markdown extends Component {
  constructor(props) {
    super(props);
    if (props.enableLightBox && !props.navigator) {
      throw new Error('props.navigator must be specified when enabling lightbox');
    }

    const opts = {
      enableLightBox: props.enableLightBox,
      navigator: props.navigator,
      imageParam: props.imageParam,
      onLink: props.onLink,
      bgImage: props.bgImage,
      onImageOpen: props.onImageOpen,
      onImageClose: props.onImageClose,
      rules: props.rules
    };

    const mergedStyles = merge({}, styles, props.styles);
    var rules = require('./rules')(mergedStyles, opts);
    rules = merge({}, SimpleMarkdown.defaultRules, rules, opts.rules);

    const parser = SimpleMarkdown.parserFor(rules);
    this.parse = function (source) {
      const blockSource = source + '\n\n';
      return parser(blockSource, {inline: false});
    };
    this.renderer = SimpleMarkdown.outputFor(rules, 'react');
  }

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps.children, this.props.children);
  }

  render() {
    const child = isArray(this.props.children)
      ? this.props.children.join('')
      : this.props.children;

    const tree = this.parse(child);

    return <View style={[styles.view, this.props.styles?.view || {}]}>{this.renderer(tree)}</View>
  }
}

export default Markdown;

const styles = StyleSheet.create({
  autolink: {
    color: 'blue',
  },
  blockQuoteText: {
    color: 'grey'
  },
  blockQuoteSection: {
    flexDirection: 'row',
  },
  blockQuoteSectionBar: {
    width: 3,
    height: null,
    backgroundColor: '#DDDDDD',
    marginRight: 15,
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgImageView: {
    flex: 1,
    overflow: 'hidden',
  },
  view: {
    alignSelf: 'stretch',
  },
  codeBlock: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Monospace',
    fontWeight: '400',
    fontSize: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 12,
    marginBottom: 12,
  },
  del: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  em: {
    fontStyle: 'italic',
  },
  heading: {
    fontWeight: '200',
  },
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  hr: {
    backgroundColor: '#cccccc',
    height: 1,
  },
  image: {
    height: 250, // Image maximum height
    width: width * 0.8, // Width based on the window width
    alignSelf: 'center',
    resizeMode: 'contain', // The image will scale uniformly (maintaining aspect ratio)
    //backgroundColor: 'red',
  },
  imageBox: {
    flex: 1,
    resizeMode: 'cover',
  },
  inlineCode: {
    backgroundColor: '#eeeeee',
    borderColor: '#dddddd',
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Monospace',
    fontWeight: 'bold',
  },
  list: {
  },
  sublist: {
    paddingLeft: 20,
    width: Dimensions.get('window').width - 60,
  },
  listItem: {
    flexDirection: 'row',
  },
  listItemText: {
    flex: 1,

  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20,
  },
  listItemNumber: {
    fontWeight: 'bold',
  },
  listRow: {
    flexDirection: 'row',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  paragraphCenter: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  paragraphWithImage: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
  },
  tableHeader: {
    backgroundColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5,
  },
  tableRow: {
    //borderBottomWidth: 1,
    borderColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableRowLast: {
    borderColor: 'transparent',
  },
  tableRowCell: {
    padding: 5,
  },
  text: {
    color: '#222222',
  },
  textRow: {
    flexDirection: 'row',
  },
  u: {
    borderColor: '#222222',
    borderBottomWidth: 1,
  },

})