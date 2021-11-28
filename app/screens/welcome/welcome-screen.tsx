import React, { FC, useState, useEffect, Fragment  } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

function useQuote() {
	const [quote, setQuote] = useState(null)

	useEffect(() => {
		updateQuote()
	}, [])

	function updateQuote() {
		fetch("http://localhost:3000/quotes")
			.then((response) => response.json())
			.then((quotes) => {
				const randomIndex = Math.floor(Math.random() * quotes.length)
				setQuote(quotes[randomIndex])
			})
	}

	return { quote, updateQuote }
}


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER = {
  marginTop: '30%',
  textAlign: "center",
}

const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  marginTop: 100,
  fontSize: 26,
  fontStyle: "italic",
}

const AUTHOR: TextStyle = {
  marginTop: 40,
  fontStyle: "italic",
  fontSize: 14,
  fontWeight: '100',
  textAlign: 'right',
}

const CONTENT: TextStyle = {
  ...TEXT,
  fontSize:14,
  paddingBottom: 20,
  color: color.palette.deepPurple,
}

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({}) => {
    const { quote, updateQuote } = useQuote()
    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.landingTitle" style={HEADER} titleStyle={HEADER_TITLE} />   
          {quote && (
            <Fragment>
              <View style={TITLE_WRAPPER}>
                <Text style={ALMOST}>{quote.text}</Text>
              </View>
              <Text style={AUTHOR}>─ {quote.author}</Text>
            </Fragment>
          )}
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Text style={CONTENT}>In case the motivation was unsuccessfull, press the button to try again. :)</Text>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.getNewQuote"
              onPress={updateQuote}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  },
)
