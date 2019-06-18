package com.notbytes.barcodereader;

import retrofit2.Call;
import java.util.List;

import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.PATCH;
import retrofit2.http.Body;
import retrofit2.http.Path;


public interface fortuneTellerAPI {
    @PATCH("api/givenFortunes/{uuid}/")
    Call<PATCH> getPatch(@Header("authorization") String token, @Path("uuid") String uuid, @Body Put put );

}
