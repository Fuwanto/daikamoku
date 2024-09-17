import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";

export default function Form({ fields, onSubmit, buttonText, fieldErrors }) {
  return (
    <View className="flex-auto items-center bg-white rounded-3xl p-4">
      {fields.map((field, index) => (
        <View key={index} className="w-80 mb-4">
          <Text className="text-base text-neutral-700 text-left p-2">
            {field.label}
          </Text>
          <TextInput
            className={`font-bold rounded-2xl p-2 bg-slate-100 ${
              fieldErrors[field.name] ? "border-red-500 border-2" : ""
            }`}
            placeholder={field.placeholder}
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={field.isPassword}
            keyboardType={field.label === "Email" ? "email-address" : "default"}
            autoCapitalize="none"
            placeholderTextColor="#A9A9A9"
          />
          {fieldErrors[field.name] ? (
            <Text className="text-red-500 text-sm">
              {fieldErrors[field.name]}
            </Text>
          ) : null}
        </View>
      ))}
      {fieldErrors["detail"] ? (
        <Text className="text-red-500 text-sm">{fieldErrors["detail"]}</Text>
      ) : null}

      <Pressable
        className="bg-custom-blue p-4 rounded-2xl m-4"
        onPress={onSubmit}
      >
        <Text className="text-xl font-bold text-white">{buttonText}</Text>
      </Pressable>
    </View>
  );
}
