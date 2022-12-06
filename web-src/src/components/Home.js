/*
* <license header>
*/

import React from 'react'
import { Heading, View } from '@adobe/react-spectrum'
import Text from './Text';
export const Home = () => (
  <View width='size-6000'>
    <Heading level={1}>Welcome to franklinreact spa!</Heading>
      <p itemID="urn:aemconnection:/content/xyz/en/jcr:content/root/container/container/teaser" itemProp="jcr:title" itemType="text">Photographer</p>
      <Text itemID="urn:aemconnection:/content/xyz/en/jcr:content/root/container/container/teaser" itemProp="jcr:title" itemType="text"/>
  </View>
)
