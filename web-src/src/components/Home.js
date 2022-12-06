/*
* <license header>
*/

import React from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import Text from './Text';
const REACT_VERSION = React.version;
export const Home = () => (
  <View width='size-6000'>
      <div>React version: {REACT_VERSION}</div>
    <Heading level={1}>Welcome to franklinreact spa!</Heading>
      <p itemID="urn:aemconnection:/content/wknd/language-masters/en/jcr:content" itemProp="jcr:title" itemType="text">Photographer</p>
      <Text itemID="urn:aemconnection:/content/wknd/language-masters/de/jcr:content" itemProp="jcr:title" itemType="text"/>
  </View>
)
