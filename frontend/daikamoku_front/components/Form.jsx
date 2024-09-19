import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Controller } from "react-hook-form";

export default function Form({
  fields,
  onSubmit,
  control,
  errors,
  buttonText,
}) {
  return (
    <View className="flex-auto items-center bg-white rounded-3xl p-4">
      {fields.map((field, index) => (
        <View key={index} className="w-80 mb-4">
          <Text className="text-base text-neutral-700 text-left p-2">
            {field.label}
          </Text>

          <Controller
            control={control}
            name={field.name}
            rules={field.validation}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`font-bold rounded-2xl p-2 bg-slate-100 ${
                  errors[field.name] ? "border-red-500 border-2" : ""
                }`}
                placeholder={field.placeholder}
                value={value}
                onChangeText={onChange}
                secureTextEntry={field.isPassword}
                keyboardType={
                  field.label === "Email" ? "email-address" : "default"
                }
                autoCapitalize="none"
                placeholderTextColor="#A9A9A9"
                onBlur={onBlur}
              />
            )}
          />

          {/* Mostrar error debajo del campo */}
          {errors[field.name] ? (
            <Text className="text-red-500 text-sm">
              {errors[field.name]?.message || "Error desconocido"}
            </Text>
          ) : null}
        </View>
      ))}

      {/* Errores generales (si existen) */}
      {errors["detail"] ? (
        <Text className="text-red-500 text-sm">
          {errors["detail"]?.message || "Error desconocido"}
        </Text>
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
