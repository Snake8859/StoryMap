package com.csuft.gis.utils;

import java.util.UUID;

/**
 * Uuid生成工具类
 */
public class UuidUtil {

	public static String get32UUID() {
		String uuid = UUID.randomUUID().toString().trim().replaceAll("-", "");
		return uuid;
	}
	
	public static String get8UUID() {
		String uuid = UUID.randomUUID().toString().trim().replaceAll("-", "");
		return uuid.substring(0, 8);
	}
	
	public static void main(String[] args) {
		for (int i = 0; i < 100; i++) {
			System.out.println(get32UUID());
		}
		
	}
}

