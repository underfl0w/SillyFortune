package com.notbytes.barcodereader;

import com.google.gson.annotations.SerializedName;

public class Put {
    @SerializedName("is_used")
    private boolean is_used;


    public Put(boolean is_used) {
        this.is_used = true;
    }

    public boolean isIs_used() {
        return is_used;
    }

}
