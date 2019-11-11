---
title: Retrofit
date: 2019-11-06 17:08:15
toc: true
comments: true
tags:
  - android
---

```groovy
ext {
    rxjavaVersion = '2.1.1'
    rxandroidVersion = '2.0.1'
    retrofitVersion = '2.3.0'
}
implementation "io.reactivex.rxjava2:rxandroid:$rxandroidVersion"
implementation "io.reactivex.rxjava2:rxjava:$rxjavaVersion"
implementation "com.squareup.retrofit2:retrofit:$retrofitVersion"
implementation "com.squareup.retrofit2:adapter-rxjava2:$retrofitVersion"
implementation "com.squareup.retrofit2:converter-gson:$retrofitVersion"
```

```java
public class NetWork {

    private static Map<String, Object> map = new HashMap<>();

    public static <T> T get(@NonNull String baseUrl, @NonNull Class<T> clazz) {
        String key = clazz.getSimpleName().concat(baseUrl);
        if (map.containsKey(key)) {
            //noinspection unchecked
            return (T) map.get(key);
        }
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(baseUrl)
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .build();
        T t = retrofit.create(clazz);
        map.put(key, t);
        return t;
    }
}
```

```java
public class NetWorkTest {

    @Test
    public void testIp() {
        List<String> ips = Arrays.asList(
                "104.194.84.57"
                , "14.194.84.55"
                , "13.194.84.55"
        );
        CountDownLatch latch = new CountDownLatch(ips.size());
        CompositeDisposable compositeDisposable = new CompositeDisposable();

        compositeDisposable.addAll(ips.stream()
                .map(s -> getDisposable(latch, s))
                .toArray(Disposable[]::new));
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private Disposable getDisposable(CountDownLatch latch, String ip) {
        return NetWork.get("http://ip-api.com/", IpService.class)
                .getIpDetail(ip)
                .subscribeOn(Schedulers.io())
                .observeOn(Schedulers.computation())
                .subscribe(ipDetail -> {
                    latch.countDown();
                    System.out.println("city:" + ipDetail.getCity());
                }, throwable -> {
                    latch.countDown();
                    System.out.println("error:" + throwable);
                });
    }
}
```

```java
public interface IpService {
     @GET("json/{ip}")
    Observable<IpDetail> getIpDetail(@Path("ip") String ip);
}
```

```java
public class IpDetail {

    private String as;
    private String city;
    private String country;
    private String countryCode;
    private String isp;
    private double lat;
    private double lon;
    private String org;
    private String query;
    private String region;
    private String regionName;
    private String status;
    private String timezone;
    private String zip;

    public String getAs() {
        return as;
    }

    public void setAs(String as) {
        this.as = as;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getIsp() {
        return isp;
    }

    public void setIsp(String isp) {
        this.isp = isp;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public String getOrg() {
        return org;
    }

    public void setOrg(String org) {
        this.org = org;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }
}
```
